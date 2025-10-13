import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import useAppStore from '@/lib/store';
import { PlanetPosition } from '@/lib/types';

export function usePanchanga() {
  const { currentLocation, selectedDate, setPanchangaData } = useAppStore();

  const now = new Date();
  const initialTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [planetaryPositions, setPlanetaryPositions] = useState<PlanetPosition[]>([]);
  const [birthChart, setBirthChart] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const calculatePanchanga = async () => {
    if (!currentLocation) {
      toast.error('Please select a location first');
      return;
    }

    setLoading(true);
    try {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));

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
        let errorMessage = 'Failed to calculate panchanga';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch {
          // Silent catch for JSON parsing errors
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();

      const panchanga = {
        date: new Date(responseData.date),
        location: responseData.location,
        ...responseData.panchanga,
        sunrise: responseData.sun?.rise || 'N/A',
        sunset: responseData.sun?.set || 'N/A',
        moonrise: responseData.moon?.rise || 'N/A',
        moonset: responseData.moon?.set || 'N/A',
        rahuKala: responseData.muhurta?.rahuKala || { start: 'N/A', end: 'N/A' },
        yamaGanda: responseData.muhurta?.yamaGanda || { start: 'N/A', end: 'N/A' },
        gulikaKala: responseData.muhurta?.gulikaKala || { start: 'N/A', end: 'N/A' },
        abhijitMuhurta: responseData.muhurta?.abhijit || { start: 'N/A', end: 'N/A' },
        durmuhurta: [],
        muhurta: responseData.muhurta,
        calendar: responseData.calendar,
        ayanamsha: responseData.calendar?.ayanamsha,
        ascendant: responseData.ascendant,
        dasha: responseData.dasha,
        api: responseData.api
      };

      setPanchangaData(panchanga);

      if (responseData.planets) {
        setPlanetaryPositions(responseData.planets || []);
      }

      if (responseData.birth_chart) {
        setBirthChart(responseData.birth_chart);
      }

      toast.success('Panchanga calculated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to calculate panchanga');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentLocation && selectedTime) {
      calculatePanchanga();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    selectedTime,
    setSelectedTime,
    planetaryPositions,
    birthChart,
    loading,
    calculatePanchanga
  };
}
