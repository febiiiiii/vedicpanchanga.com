'use client';

import { Toaster } from '@/components/ui/sonner';
import { UniversalHeader } from '@/components/universal-header';
import { SettingsPanel } from '@/components/settings-panel';
import { PanchangaResults } from '@/components/panchanga-results';
import { EducationalContent } from '@/components/educational-content';
import { Footer } from '@/components/footer';
import { usePanchanga } from '@/hooks/usePanchanga';
import { useGeolocation } from '@/hooks/useGeolocation';
import useAppStore from '@/lib/store';

export default function Home() {
  const { setCurrentLocation } = useAppStore();

  const {
    selectedTime,
    setSelectedTime,
    planetaryPositions,
    birthChart,
    loading,
    calculatePanchanga
  } = usePanchanga();

  const {
    loading: locationLoading,
    getCurrentLocation
  } = useGeolocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Smooth Radial Gradient Backgrounds */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-1/4 w-[200%] h-[150%] opacity-30">
          <div className="absolute inset-0 bg-gradient-radial-at-tl from-primary/20 via-primary/5 to-transparent" />
        </div>
        <div className="absolute -bottom-1/2 -right-1/4 w-[200%] h-[150%] opacity-40">
          <div className="absolute inset-0 bg-gradient-radial-at-br from-secondary/15 via-secondary/5 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      <main className="relative z-10">
        <Toaster />
        <UniversalHeader />

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 md:py-8 lg:py-10">
          {/* Calculator Section - Improved responsive grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
            <div className="lg:col-span-1 xl:col-span-1">
              <div className="animate-fade-in">
                <SettingsPanel
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                  onLocationChange={setCurrentLocation}
                  onUseCurrentLocation={getCurrentLocation}
                  locationLoading={locationLoading}
                  onCalculate={calculatePanchanga}
                  loading={loading}
                />
              </div>
            </div>

            <div className="lg:col-span-2 xl:col-span-3">
              <div className="animate-fade-in animation-delay-100">
                <PanchangaResults
                  planetaryPositions={planetaryPositions}
                  birthChart={birthChart}
                />
              </div>
            </div>
          </div>

          {/* Educational Content Section with better spacing */}
          <div className="mb-8 md:mb-12 lg:mb-16 animate-fade-in animation-delay-200">
            <EducationalContent />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
