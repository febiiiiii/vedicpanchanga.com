'use client';

import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, MapPin, Loader2, Globe } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import useAppStore from '@/lib/store';
import type { Location } from '@/lib/types';
import { searchCities, getPopularCities, POPULAR_CITIES, City } from '@/lib/world-cities';
import debounce from 'lodash/debounce';

interface CityDropdownProps {
  onLocationChange?: (location: Location) => void;
  className?: string;
}

export function CityDropdown({ onLocationChange, className }: CityDropdownProps) {
  const { currentLocation, setCurrentLocation, recentLocations, addRecentLocation } = useAppStore();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [popularCities] = useState<City[]>(getPopularCities());
  const [isDetecting, setIsDetecting] = useState(false);

  // Debounced search
  const performSearch = React.useCallback(
    debounce((query: string) => {
      if (query.length >= 2) {
        const results = searchCities(query);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    performSearch(searchValue);
  }, [searchValue, performSearch]);

  const handleSelectCity = (city: City) => {
    const location: Location = {
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone,
      city: city.name,
      country: city.country
    };

    setCurrentLocation(location);
    addRecentLocation(location);
    onLocationChange?.(location);
    setOpen(false);
    setSearchValue('');
  };

  const detectCurrentLocation = async () => {
    setIsDetecting(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'VedicPanchanga/1.0'
                }
              }
            );

            let city = 'Current Location';
            let country = '';

            if (response.ok) {
              const data = await response.json();
              city = data.address.city || data.address.town || data.address.village || data.address.state || 'Current Location';
              country = data.address.country || '';
            }

            const location: Location = {
              latitude,
              longitude,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              city,
              country
            };

            setCurrentLocation(location);
            addRecentLocation(location);
            onLocationChange?.(location);
            setIsDetecting(false);
          } catch (error) {
            console.error('Error getting location details:', error);
            setIsDetecting(false);
          }
        },
        (error) => {
          console.error('Error detecting location:', error);
          setIsDetecting(false);
        }
      );
    }
  };

  // Group cities by country
  const citiesByCountry = React.useMemo(() => {
    const grouped: Record<string, City[]> = {};
    [...searchResults, ...popularCities].forEach(city => {
      if (!grouped[city.country]) {
        grouped[city.country] = [];
      }
      if (!grouped[city.country].find(c => c.name === city.name)) {
        grouped[city.country].push(city);
      }
    });
    return grouped;
  }, [searchResults, popularCities]);

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

            {/* Current Location Button */}
            <CommandGroup>
              <CommandItem
                onSelect={() => detectCurrentLocation()}
                className="cursor-pointer"
                disabled={isDetecting}
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting location...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Use Current Location
                  </>
                )}
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            {/* Recent Locations */}
            {recentLocations.length > 0 && !searchValue && (
              <>
                <CommandGroup heading="Recent">
                  {recentLocations.slice(0, 3).map((location, index) => (
                    <CommandItem
                      key={`recent-${index}`}
                      value={`${location.city}-${location.country}`}
                      onSelect={() => {
                        setCurrentLocation(location);
                        onLocationChange?.(location);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentLocation?.city === location.city ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex items-center justify-between w-full">
                        <span>{location.city}</span>
                        <span className="text-xs text-muted-foreground">
                          {location.country}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* Search Results or Popular Cities */}
            {searchValue.length >= 2 ? (
              // Show search results
              Object.entries(citiesByCountry).map(([country, cities]) => (
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
                      <div className="flex items-center justify-between w-full">
                        <span>{city.name}</span>
                        {city.population && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {(city.population / 1000000).toFixed(1)}M
                          </Badge>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              // Show popular cities when not searching
              <>
                <CommandGroup heading="Popular Cities">
                  {popularCities.map((city) => (
                    <CommandItem
                      key={`popular-${city.name}-${city.country}`}
                      value={`${city.name}-${city.country}`}
                      onSelect={() => handleSelectCity(city)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentLocation?.city === city.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span>{city.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {city.country}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                {/* All Cities by Region */}
                <CommandGroup heading="All Cities">
                  <div className="p-2 text-xs text-muted-foreground">
                    Type at least 2 characters to search all cities
                  </div>
                </CommandGroup>
              </>
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