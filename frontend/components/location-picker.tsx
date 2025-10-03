'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Location } from '@/lib/types';
import { MapPin, Locate, Search, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationPickerProps {
  location: Location;
  onLocationChange: (location: Location) => void;
  recentLocations?: Location[];
}

const popularCities: Location[] = [
  { city: 'New Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { city: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { city: 'Bangalore', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { city: 'Kolkata', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { city: 'Chennai', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { city: 'Varanasi', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
  { city: 'Pune', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
  { city: 'Hyderabad', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { city: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { city: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { city: 'San Francisco', country: 'USA', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles' },
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
];

export function LocationPicker({ location, onLocationChange, recentLocations = [] }: LocationPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [manualEntry, setManualEntry] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const handleSelectCity = (city: Location) => {
    onLocationChange(city);
    setOpen(false);
  };

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Try to get city name from reverse geocoding
          let city = 'Current Location';
          let country = '';

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'VedicPanchanga/1.0'
                }
              }
            );

            if (response.ok) {
              const data = await response.json();
              city = data.address.city || data.address.town || data.address.village || data.address.state || 'Current Location';
              country = data.address.country || '';
            }
          } catch (error) {
            console.error('Error getting city name:', error);
          }

          const newLocation: Location = {
            latitude,
            longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            city,
            country
          };
          onLocationChange(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleManualSave = () => {
    onLocationChange(tempLocation);
    setManualEntry(false);
  };

  const filteredCities = popularCities.filter(city =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (city.country && city.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </CardTitle>
        <CardDescription>
          Select your location for accurate calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {location.city}{location.country && `, ${location.country}`}
                  </span>
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search city..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    {recentLocations.length > 0 && (
                      <CommandGroup heading="Recent">
                        {recentLocations.map((loc, idx) => (
                          <CommandItem
                            key={idx}
                            onSelect={() => handleSelectCity(loc)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                location.city === loc.city ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {loc.city}, {loc.country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                    <CommandGroup heading="Popular Cities">
                      {filteredCities.map((city, idx) => (
                        <CommandItem
                          key={idx}
                          onSelect={() => handleSelectCity(city)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              location.city === city.city ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {city.city}, {city.country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleGetCurrentLocation}
            title="Use current location"
          >
            <Locate className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
        </div>

        {!manualEntry ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setManualEntry(true)}
          >
            Enter coordinates manually
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.0001"
                  value={tempLocation.latitude}
                  onChange={(e) => setTempLocation({
                    ...tempLocation,
                    latitude: parseFloat(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.0001"
                  value={tempLocation.longitude}
                  onChange={(e) => setTempLocation({
                    ...tempLocation,
                    longitude: parseFloat(e.target.value)
                  })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City Name</Label>
              <Input
                id="city"
                value={tempLocation.city}
                onChange={(e) => setTempLocation({
                  ...tempLocation,
                  city: e.target.value
                })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleManualSave} size="sm">
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setManualEntry(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}