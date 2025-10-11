'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Panchanga } from '@/lib/types';
import { Sun, Moon, Calendar, Clock, MapPin } from 'lucide-react';
import { SanskritTerm, SANSKRIT_EXPLANATIONS } from '@/components/sanskrit-term';

interface PanchangaCardProps {
  panchanga: Panchanga;
}

export function PanchangaCard({ panchanga }: PanchangaCardProps) {
  return (
    <Card className="w-full shadow-lg border-2">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent pb-4">
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
          <Calendar className="h-6 w-6 text-primary" />
          Panchanga for {panchanga.date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-base">
          <MapPin className="h-4 w-4" />
          {panchanga.location.city}, {panchanga.location.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Sun and Moon Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-3 font-semibold text-orange-700 dark:text-orange-400">
              <Sun className="h-5 w-5" />
              Surya (Sun)
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Sunrise</div>
                <div className="text-lg font-semibold">{panchanga.sunrise}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Sunset</div>
                <div className="text-lg font-semibold">{panchanga.sunset}</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3 font-semibold text-blue-700 dark:text-blue-400">
              <Moon className="h-5 w-5" />
              Chandra (Moon)
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Moonrise</div>
                <div className="text-lg font-semibold">{panchanga.moonrise}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Moonset</div>
                <div className="text-lg font-semibold">{panchanga.moonset}</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Panchangam - Five Elements */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-primary">॥</span> Panchangam (Five Elements)
          </h3>
          <div className="space-y-5">
            {/* Tithi */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <SanskritTerm term="Tithi" explanation={SANSKRIT_EXPLANATIONS.tithi} />
                  <span className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                    {panchanga.tithi.name}
                  </span>
                  <Badge variant="secondary" className="ml-2">
                    {panchanga.tithi.paksha} Paksha
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Until {panchanga.tithi.endTime}</span>
                </div>
              </div>
            </div>

            {/* Nakshatra */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <SanskritTerm term="Nakshatra" explanation={SANSKRIT_EXPLANATIONS.nakshatra} />
                  <span className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                    {panchanga.nakshatra.name}
                  </span>
                  {panchanga.nakshatra.pada && (
                    <Badge variant="secondary" className="ml-2">
                      Pada {panchanga.nakshatra.pada}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Until {panchanga.nakshatra.endTime}</span>
                </div>
              </div>
            </div>

            {/* Yoga */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-950/20">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="flex items-center gap-2">
                  <SanskritTerm term="Yoga" explanation={SANSKRIT_EXPLANATIONS.yoga} />
                  <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                    {panchanga.yoga.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Until {panchanga.yoga.endTime}</span>
                </div>
              </div>
            </div>

            {/* Karana */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-950/20">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="flex items-center gap-2">
                  <SanskritTerm term="Karana" explanation={SANSKRIT_EXPLANATIONS.karana} />
                  <span className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                    {panchanga.karana.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Until {panchanga.karana.endTime}</span>
                </div>
              </div>
            </div>

            {/* Vaara */}
            <div className="p-4 rounded-lg border bg-gradient-to-r from-rose-50/50 to-transparent dark:from-rose-950/20">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="flex items-center gap-2">
                  <SanskritTerm term="Vaara" explanation={SANSKRIT_EXPLANATIONS.vaara} />
                  <span className="text-lg font-semibold text-rose-700 dark:text-rose-400">
                    {panchanga.vaara.name}
                  </span>
                </div>
                <Badge variant="default" className="bg-rose-600 dark:bg-rose-700">
                  Lord: {panchanga.vaara.lord}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Muhurta & Important Timings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <SanskritTerm term="Muhurta" explanation={SANSKRIT_EXPLANATIONS.muhurta} /> & Important Timings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Auspicious Time */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-400 dark:border-green-700">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <SanskritTerm term="Abhijit Muhurta" explanation={SANSKRIT_EXPLANATIONS.abhijitMuhurta} showIcon={false} />
                </div>
                <Badge variant="default" className="bg-green-600">Auspicious</Badge>
              </div>
              <div className="text-lg font-bold text-green-800 dark:text-green-300">
                {panchanga.muhurta?.abhijit?.start || 'N/A'} - {panchanga.muhurta?.abhijit?.end || 'N/A'}
              </div>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">Best time for all activities</p>
            </div>

            {/* Rahu Kala */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-300 dark:border-red-800">
              <div className="flex items-start justify-between mb-2">
                <SanskritTerm term="Rahu Kala" explanation={SANSKRIT_EXPLANATIONS.rahuKala} showIcon={false} />
                <Badge variant="destructive">Inauspicious</Badge>
              </div>
              <div className="text-lg font-bold text-red-700 dark:text-red-400">
                {panchanga.muhurta?.rahuKala?.start || 'N/A'} - {panchanga.muhurta?.rahuKala?.end || 'N/A'}
              </div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Avoid important activities</p>
            </div>

            {/* Yama Ganda */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-300 dark:border-orange-800">
              <div className="flex items-start justify-between mb-2">
                <SanskritTerm term="Yama Ganda" explanation={SANSKRIT_EXPLANATIONS.yamaGanda} showIcon={false} />
                <Badge variant="secondary" className="bg-orange-200 dark:bg-orange-800">Unfavorable</Badge>
              </div>
              <div className="text-lg font-bold text-orange-700 dark:text-orange-400">
                {panchanga.muhurta?.yamaGanda?.start || 'N/A'} - {panchanga.muhurta?.yamaGanda?.end || 'N/A'}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Not suitable for new beginnings</p>
            </div>

            {/* Gulika Kala */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-300 dark:border-yellow-800">
              <div className="flex items-start justify-between mb-2">
                <SanskritTerm term="Gulika Kala" explanation={SANSKRIT_EXPLANATIONS.gulikaKala} showIcon={false} />
                <Badge variant="secondary" className="bg-yellow-200 dark:bg-yellow-800">Unfavorable</Badge>
              </div>
              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                {panchanga.muhurta?.gulikaKala?.start || 'N/A'} - {panchanga.muhurta?.gulikaKala?.end || 'N/A'}
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Avoid auspicious activities</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Vedic Calendar Info */}
        {panchanga.calendar && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Vedic Calendar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Masa */}
                {panchanga.calendar.masa && typeof panchanga.calendar.masa === 'object' && (
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-violet-50/50 to-transparent dark:from-violet-950/20">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Māsa (Month)</div>
                    <div className="text-lg font-semibold text-violet-700 dark:text-violet-400">
                      {panchanga.calendar.masa.name}
                    </div>
                    {panchanga.calendar.masa.is_leap && (
                      <Badge variant="secondary" className="mt-2 text-xs">Adhika (Leap)</Badge>
                    )}
                  </div>
                )}

                {/* Ritu */}
                {panchanga.calendar.ritu && typeof panchanga.calendar.ritu === 'object' && (
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Ṛitu (Season)</div>
                    <div className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                      {panchanga.calendar.ritu.name}
                    </div>
                  </div>
                )}

                {/* Samvatsara */}
                {panchanga.calendar.samvatsara && typeof panchanga.calendar.samvatsara === 'object' && (
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Saṃvatsara (Year)</div>
                    <div className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                      {panchanga.calendar.samvatsara.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {/* Ascendant & Dasha Info */}
        {(panchanga.ascendant || panchanga.dasha) && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-primary">⚹</span>
                Birth Chart Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ascendant */}
                {panchanga.ascendant && (
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Lagna (Ascendant)</div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                          {panchanga.ascendant.zodiac_sign}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Longitude:</span>
                          <span className="font-mono font-semibold">{panchanga.ascendant.longitude.toFixed(4)}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nakshatra:</span>
                          <span className="font-semibold">{panchanga.ascendant.nakshatra}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pada:</span>
                          <Badge variant="secondary">{panchanga.ascendant.pada}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Dasha */}
                {panchanga.dasha && (
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Current Mahādaśā</div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                          {panchanga.dasha.planet}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start:</span>
                          <span className="font-semibold">{panchanga.dasha.start_date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End:</span>
                          <span className="font-semibold">{panchanga.dasha.end_date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-semibold">{panchanga.dasha.duration} years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}

        {/* Ayanamsha */}
        <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              <SanskritTerm term="Ayanamsha" explanation={SANSKRIT_EXPLANATIONS.ayanamsha} showIcon={false} />
            </span>
            <span className="text-xs text-muted-foreground">(Lahiri)</span>
          </div>
          <span className="font-mono text-lg font-semibold">{panchanga.ayanamsha.toFixed(6)}°</span>
        </div>
      </CardContent>
    </Card>
  );
}