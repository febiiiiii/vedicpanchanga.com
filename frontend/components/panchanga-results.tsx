'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PanchangaCard } from '@/components/panchanga-card';
import { PlanetaryPositions } from '@/components/planetary-positions';
import { NorthIndianChart } from '@/components/north-indian-chart';
import { Calendar, Star, Diamond, Sun } from 'lucide-react';
import useAppStore from '@/lib/store';
import { PlanetPosition } from '@/lib/types';

interface PanchangaResultsProps {
  planetaryPositions: PlanetPosition[];
  birthChart?: string;
}

export function PanchangaResults({ planetaryPositions, birthChart }: PanchangaResultsProps) {
  const { panchangaData } = useAppStore();

  return (
    <Tabs defaultValue="panchanga" className="space-y-4 sm:space-y-6">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 p-1.5">
        <TabsTrigger value="panchanga" className="flex items-center gap-2 text-xs sm:text-sm py-2.5 px-3 min-h-[44px] transition-all duration-200">
          <Calendar className="h-4 w-4 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline font-medium">Panchanga</span>
          <span className="sm:hidden font-medium">Panch</span>
        </TabsTrigger>
        <TabsTrigger value="planets" className="flex items-center gap-2 text-xs sm:text-sm py-2.5 px-3 min-h-[44px] transition-all duration-200">
          <Star className="h-4 w-4 sm:h-4 sm:w-4" />
          <span className="font-medium">Planets</span>
        </TabsTrigger>
        <TabsTrigger value="chart" className="flex items-center gap-2 text-xs sm:text-sm py-2.5 px-3 min-h-[44px] transition-all duration-200">
          <Diamond className="h-4 w-4 sm:h-4 sm:w-4" />
          <span className="font-medium">Chart</span>
        </TabsTrigger>
        <TabsTrigger value="muhurta" className="flex items-center gap-2 text-xs sm:text-sm py-2.5 px-3 min-h-[44px] transition-all duration-200">
          <Sun className="h-4 w-4 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline font-medium">Muhurta</span>
          <span className="sm:hidden font-medium">Time</span>
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

      <TabsContent value="chart">
        {birthChart ? (
          <NorthIndianChart chartImage={birthChart} />
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center text-muted-foreground">
                <Diamond className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Calculate panchanga to view birth chart</p>
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
  );
}
