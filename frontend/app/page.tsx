'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PanchangaCard } from '@/components/panchanga-card';
import { LocationPicker } from '@/components/location-picker';
import { DateTimePicker } from '@/components/date-time-picker';
import { PlanetaryPositions } from '@/components/planetary-positions';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import useAppStore from '@/lib/store';
import { PlanetPosition, Location } from '@/lib/types';
import { format } from 'date-fns';
import { Sparkles, Sun, Calendar, Star, RefreshCw, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const {
    currentLocation,
    setCurrentLocation,
    selectedDate,
    setSelectedDate,
    panchangaData,
    setPanchangaData,
    recentLocations,
    addRecentLocation
  } = useAppStore();

  const [selectedTime, setSelectedTime] = useState(format(new Date(), 'HH:mm'));
  const [planetaryPositions, setPlanetaryPositions] = useState<PlanetPosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Calculate panchanga when location or date changes
  const calculateAndSetPanchanga = async () => {
    if (!currentLocation) {
      toast.error('Please select a location first');
      return;
    }

    setLoading(true);
    try {
      // Combine date and time
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));

      // Call API to calculate panchanga
      const response = await fetch('/api/v1/panchanga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateTime.toISOString(),
          location: currentLocation
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate panchanga');
      }

      const responseData = await response.json();
      // Restructure the data to match the expected format
      const panchanga = {
        date: new Date(responseData.date),
        location: responseData.location,
        ...responseData.panchanga, // Spread the nested panchanga properties
        // Map sun/moon rise/set to expected format
        sunrise: responseData.sun?.rise || 'N/A',
        sunset: responseData.sun?.set || 'N/A',
        moonrise: responseData.moon?.rise || 'N/A',
        moonset: responseData.moon?.set || 'N/A',
        // Map muhurta timings to expected format
        rahuKala: responseData.muhurta?.rahuKala || { start: 'N/A', end: 'N/A' },
        yamaGanda: responseData.muhurta?.yamaGanda || { start: 'N/A', end: 'N/A' },
        gulikaKala: responseData.muhurta?.gulikaKala || { start: 'N/A', end: 'N/A' },
        abhijitMuhurta: responseData.muhurta?.abhijit || { start: 'N/A', end: 'N/A' },
        durmuhurta: [],
        muhurta: responseData.muhurta,
        calendar: responseData.calendar,
        ayanamsha: responseData.calendar?.ayanamsha,
        api: responseData.api
      };

      setPanchangaData(panchanga);

      // Extract planetary positions from the response
      if (responseData.planets) {
        setPlanetaryPositions(responseData.planets || []);
      }

      toast.success('Panchanga calculated successfully');
    } catch (error) {
      console.error('Error calculating panchanga:', error);
      toast.error('Failed to calculate panchanga');
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect location on mount
  useEffect(() => {
    const getLocationAndCalculate = async () => {
      if ('geolocation' in navigator) {
        setLocationLoading(true);
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
            setCurrentLocation(newLocation);
            addRecentLocation(newLocation);
            setLocationLoading(false);

            // Auto-calculate after location is set
            setTimeout(() => calculateAndSetPanchanga(), 100);
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationLoading(false);
            // Fall back to default location and calculate
            calculateAndSetPanchanga();
          }
        );
      } else {
        // Geolocation not supported, use default location
        calculateAndSetPanchanga();
      }
    };

    getLocationAndCalculate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLocationChange = (newLocation: Location) => {
    setCurrentLocation(newLocation);
    addRecentLocation(newLocation);
  };

  const handleRefresh = () => {
    calculateAndSetPanchanga();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl animate-float">
                <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                  Vedic Panchanga
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Traditional Hindu Calendar & Astrology
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/api-docs">
                <Button variant="ghost" size="icon" className="rounded-full" title="API Documentation">
                  <BookOpen className="h-5 w-5" />
                </Button>
              </Link>
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={loading}
                className="rounded-full"
                title="Refresh calculations"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {locationLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <RefreshCw className="h-12 w-12 mx-auto animate-spin text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Getting your location...</h3>
                <p className="text-sm text-muted-foreground">
                  Please allow location access for accurate panchanga calculations
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <DateTimePicker
                date={selectedDate}
                time={selectedTime}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
              />
              {currentLocation && (
                <LocationPicker
                  location={currentLocation}
                  onLocationChange={handleLocationChange}
                  recentLocations={recentLocations}
                />
              )}
              <Button
                onClick={calculateAndSetPanchanga}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Calculate Panchanga
                  </>
                )}
              </Button>
            </div>

          {/* Right Content - Results */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="panchanga" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="panchanga" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Panchanga
                </TabsTrigger>
                <TabsTrigger value="planets" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Planets
                </TabsTrigger>
                <TabsTrigger value="muhurta" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Muhurta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="panchanga">
                {panchangaData ? (
                  <PanchangaCard panchanga={panchangaData} />
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-96">
                      <div className="text-center text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select date, time and location to calculate panchanga</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="planets">
                {planetaryPositions.length > 0 ? (
                  <PlanetaryPositions positions={planetaryPositions} />
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-96">
                      <div className="text-center text-muted-foreground">
                        <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Calculate panchanga to view planetary positions</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="muhurta">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5" />
                      Muhurta & Important Timings
                    </CardTitle>
                    <CardDescription>
                      Auspicious and inauspicious time periods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {panchangaData ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {panchangaData.abhijitMuhurta && panchangaData.abhijitMuhurta.start !== 'N/A' && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-green-600">Auspicious Times</h4>
                              <div className="space-y-1 text-sm">
                                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                  <div className="font-medium text-green-700 dark:text-green-400">Abhijit Muhurta</div>
                                  <div className="text-muted-foreground mt-1">
                                    {panchangaData.muhurta?.abhijit?.start || 'N/A'} - {panchangaData.muhurta?.abhijit?.end || 'N/A'}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">Best time for all activities</div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-red-600">Inauspicious Times</h4>
                            <div className="space-y-2 text-sm">
                              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                                <div className="font-medium text-red-700 dark:text-red-400">Rahu Kala</div>
                                <div className="text-muted-foreground mt-1">
                                  {panchangaData.muhurta?.rahuKala?.start || 'N/A'} - {panchangaData.muhurta?.rahuKala?.end || 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Avoid important activities</div>
                              </div>
                              <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                                <div className="font-medium text-orange-700 dark:text-orange-400">Yama Ganda</div>
                                <div className="text-muted-foreground mt-1">
                                  {panchangaData.muhurta?.yamaGanda?.start || 'N/A'} - {panchangaData.muhurta?.yamaGanda?.end || 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Not suitable for new beginnings</div>
                              </div>
                              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                <div className="font-medium text-yellow-700 dark:text-yellow-400">Gulika Kala</div>
                                <div className="text-muted-foreground mt-1">
                                  {panchangaData.muhurta?.gulikaKala?.start || 'N/A'} - {panchangaData.muhurta?.gulikaKala?.end || 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Avoid auspicious activities</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {panchangaData.ayanamsha !== undefined && (
                          <div className="mt-6 p-4 bg-muted rounded-lg">
                            <h4 className="font-semibold mb-2">Ayanamsha (Lahiri)</h4>
                            <p className="text-2xl font-mono">{panchangaData.ayanamsha.toFixed(6)}°</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48">
                        <div className="text-center text-muted-foreground">
                          <Sun className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Calculate panchanga to view muhurta timings</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Vedic Panchanga - Traditional Hindu Calendar System
            </p>
            <p className="mt-1">
              Calculations are approximate and for general guidance only
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
