'use client';

import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/header';
import { SettingsPanel } from '@/components/settings-panel';
import { PanchangaResults } from '@/components/panchanga-results';
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
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <Toaster />
      <Header loading={loading} onRefresh={calculatePanchanga} />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
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

          <div className="lg:col-span-2">
            <PanchangaResults
              planetaryPositions={planetaryPositions}
              birthChart={birthChart}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
