import { useState } from 'react';
import { toast } from 'sonner';
import useAppStore from '@/lib/store';
import { Location } from '@/lib/types';

export function useGeolocation() {
  const { setCurrentLocation } = useAppStore();
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    if (!('geolocation' in navigator)) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const [geoResponse, timezoneResponse] = await Promise.all([
            fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              { headers: { 'User-Agent': 'VedicPanchanga/1.0' } }
            ),
            fetch(`https://timeapi.io/api/TimeZone/coordinate?latitude=${latitude}&longitude=${longitude}`)
          ]);

          let city = 'Current Location';
          let country = '';
          let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          if (geoResponse.ok) {
            const data = await geoResponse.json();
            city = data.address.city || data.address.town || data.address.village ||
                   data.address.state || 'Current Location';
            country = data.address.country || '';
          }

          if (timezoneResponse.ok) {
            const tzData = await timezoneResponse.json();
            timezone = tzData.timeZone || timezone;
          }

          const newLocation: Location = {
            latitude,
            longitude,
            timezone,
            city,
            country
          };

          setCurrentLocation(newLocation);
          setLoading(false);
          toast.success(`Location set to ${city}`);
        } catch {
          setLoading(false);
          toast.error('Unable to get location details');
        }
      },
      () => {
        setLoading(false);
        toast.error('Unable to get your location. Please select manually.');
      }
    );
  };

  return {
    loading,
    getCurrentLocation
  };
}
