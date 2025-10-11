'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Check, ChevronsUpDown, MapPin, Globe, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useAppStore from '@/lib/store';
import type { Location } from '@/lib/types';
import { getPopularCities, searchCities, City } from '@/lib/world-cities';
import debounce from 'lodash/debounce';

interface CityDropdownProps {
  onLocationChange?: (location: Location) => void;
  className?: string;
}

export function CityDropdown({ onLocationChange, className }: CityDropdownProps) {
  const { currentLocation, setCurrentLocation } = useAppStore();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [popularCities] = useState<City[]>(getPopularCities());
  const [isSearching, setIsSearching] = useState(false);

  // Get timezone from coordinates
  const getTimezoneFromCoords = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
    } catch (error) {
      console.error('Error getting timezone:', error);
    }
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  // Search cities (local first, then Nominatim API) - only get timezone on selection
  useEffect(() => {
    const search = debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      // First, search in local cities (instant results)
      const localResults = searchCities(query);

      // Set local results immediately
      setSearchResults(localResults);

      // Then fetch from Nominatim API for additional results
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1`,
          { headers: { 'User-Agent': 'VedicPanchanga/1.0' } }
        );

        if (!response.ok) {
          setIsSearching(false);
          return; // Keep local results
        }

        const results = await response.json();
        // Don't fetch timezone for all results - only when selected
        const apiCities: City[] = results
          .filter((r: { lat: string; lon: string }) => r.lat && r.lon)
          .slice(0, 5)
          .map((r: {
            lat: string;
            lon: string;
            address?: { city?: string; town?: string; village?: string; state?: string; country?: string };
            display_name: string;
          }) => {
            const lat = parseFloat(r.lat);
            const lon = parseFloat(r.lon);
            const name = r.address?.city || r.address?.town || r.address?.village ||
                        r.address?.state || r.display_name.split(',')[0];

            return {
              name,
              country: r.address?.country || '',
              latitude: lat,
              longitude: lon,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use browser timezone as placeholder
            };
          });

        // Combine local and API results, removing duplicates
        const combinedResults = [...localResults];
        apiCities.forEach(apiCity => {
          if (!combinedResults.some(local =>
            local.name.toLowerCase() === apiCity.name.toLowerCase() &&
            local.country.toLowerCase() === apiCity.country.toLowerCase()
          )) {
            combinedResults.push(apiCity);
          }
        });

        setSearchResults(combinedResults);
        setIsSearching(false);
      } catch (error) {
        console.error('Error searching cities:', error);
        setIsSearching(false);
        // Keep local results on error
      }
    }, 500);

    search(searchValue);

    return () => {
      search.cancel();
    };
  }, [searchValue]);

  const handleSelectCity = useCallback(async (city: City) => {
    // Get accurate timezone when city is selected
    const timezone = await getTimezoneFromCoords(city.latitude, city.longitude);

    const location: Location = {
      latitude: city.latitude,
      longitude: city.longitude,
      timezone,
      city: city.name,
      country: city.country
    };

    setCurrentLocation(location);
    onLocationChange?.(location);
    setOpen(false);
    setSearchValue('');
  }, [setCurrentLocation, onLocationChange]);

  // Group cities by country (only for search results)
  const citiesByCountry = React.useMemo(() => {
    const grouped: Record<string, City[]> = {};
    searchResults.forEach(city => {
      if (!grouped[city.country]) {
        grouped[city.country] = [];
      }
      if (!grouped[city.country].find(c => c.name === city.name)) {
        grouped[city.country].push(city);
      }
    });
    return grouped;
  }, [searchResults]);

  // Format location display
  const locationDisplay = currentLocation
    ? `${currentLocation.city}${currentLocation.country ? ', ' + currentLocation.country : ''}`
    : 'Select location...';

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{locationDisplay}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search cities..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No city found. Try a different search.</CommandEmpty>

            {/* Search Results or Popular Cities */}
            {searchValue.length >= 2 ? (
              <>
                {Object.entries(citiesByCountry).map(([country, cities]) => (
                  <CommandGroup key={country} heading={country}>
                    {cities.map((city) => (
                      <CommandItem
                        key={`${city.name}-${city.country}`}
                        value={`${city.name}-${city.country}`}
                        onSelect={() => handleSelectCity(city)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            currentLocation?.city === city.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span>{city.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
                {isSearching && (
                  <div className="flex items-center justify-center gap-2 p-3 text-xs text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Searching worldwide...</span>
                  </div>
                )}
              </>
            ) : (
              // Show popular cities when not searching
              <CommandGroup heading="Popular Cities">
                {popularCities.map((city) => (
                  <CommandItem
                    key={`${city.name}-${city.country}`}
                    value={`${city.name}-${city.country}`}
                    onSelect={() => handleSelectCity(city)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentLocation?.city === city.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span>{city.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{city.country}</span>
                  </CommandItem>
                ))}
                <CommandSeparator />
                <div className="p-2 text-xs text-muted-foreground text-center">
                  Type 2+ characters to search worldwide
                </div>
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {/* Display coordinates below dropdown */}
      {currentLocation && (
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
          <Globe className="h-3 w-3" />
          Lat: {currentLocation.latitude.toFixed(4)}, Long: {currentLocation.longitude.toFixed(4)}
          {currentLocation.timezone && ` • ${currentLocation.timezone}`}
        </div>
      )}
    </div>
  );
}