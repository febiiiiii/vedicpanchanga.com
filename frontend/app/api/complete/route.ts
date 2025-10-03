import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { formatTime12Hour } from '@/lib/api-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper to determine paksha from tithi index
const getPaksha = (tithiIndex: number): 'Shukla' | 'Krishna' => {
  return tithiIndex <= 15 ? 'Shukla' : 'Krishna';
};


// Helper to get timezone offset
function getTimezoneOffset(timezoneString: string): number {
  const commonTimezones: Record<string, number> = {
    'Asia/Kolkata': 5.5,
    'Asia/Calcutta': 5.5,
    'Asia/Mumbai': 5.5,
    'Asia/Delhi': 5.5,
    'Asia/Kathmandu': 5.75,
    'Asia/Dhaka': 6,
    'Asia/Colombo': 5.5,
    'America/New_York': -5,
    'America/Los_Angeles': -8,
    'America/Chicago': -6,
    'Europe/London': 0,
    'Europe/Paris': 1,
    'Asia/Dubai': 4,
    'Asia/Singapore': 8,
    'Asia/Tokyo': 9,
    'Australia/Sydney': 10,
  };

  return commonTimezones[timezoneString] ?? 5.5;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous';
    const rateLimitResult = await checkRateLimit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { date, location } = body;

    if (!date || !location) {
      return NextResponse.json(
        { error: 'Date and location are required' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(date);
    const timezoneOffset = getTimezoneOffset(location.timezone || 'Asia/Kolkata');

    // Prepare request for Python API
    const apiRequest = {
      date: {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate()
      },
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: timezoneOffset
      }
    };

    // Fetch all data in parallel from Python API
    const [
      panchangaResponse,
      planetaryResponse,
      dashaResponse
    ] = await Promise.all([
      fetch(`${API_BASE_URL}/panchanga`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiRequest),
      }),
      fetch(`${API_BASE_URL}/planetary-positions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiRequest),
      }),
      fetch(`${API_BASE_URL}/vimsottari-dasha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiRequest),
      })
    ]);

    // Check if all requests were successful
    if (!panchangaResponse.ok) {
      throw new Error('Failed to calculate panchanga');
    }

    const panchanga = await panchangaResponse.json();
    const planetary = planetaryResponse.ok ? await planetaryResponse.json() : null;
    const dasha = dashaResponse.ok ? await dashaResponse.json() : null;

    // Transform and combine all data
    const completeData = {
      // Request metadata
      request: {
        date: parsedDate.toISOString(),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          timezone: location.timezone || 'Asia/Kolkata',
          city: location.city || 'Unknown',
          country: location.country || ''
        }
      },

      // Basic Panchanga
      panchanga: {
        // Sun and Moon timings
        sun: {
          sunrise: formatTime12Hour(panchanga.sunrise),
          sunset: formatTime12Hour(panchanga.sunset)
        },
        moon: {
          moonrise: formatTime12Hour(panchanga.moonrise),
          moonset: formatTime12Hour(panchanga.moonset)
        },

        // Five elements
        tithi: {
          name: panchanga.tithi.name,
          index: panchanga.tithi.index,
          paksha: getPaksha(panchanga.tithi.index),
          endTime: formatTime12Hour(panchanga.tithi.end_time)
        },
        nakshatra: {
          name: panchanga.nakshatra.name,
          index: panchanga.nakshatra.index,
          pada: 1, // TODO: Get from Python API
          endTime: formatTime12Hour(panchanga.nakshatra.end_time),
          lord: 'N/A' // TODO: Calculate based on index
        },
        yoga: {
          name: panchanga.yoga.name,
          index: panchanga.yoga.index,
          endTime: formatTime12Hour(panchanga.yoga.end_time)
        },
        karana: {
          name: panchanga.karana.name,
          index: panchanga.karana.index,
          endTime: formatTime12Hour(panchanga.karana.end_time)
        },
        vaara: {
          name: panchanga.vaara.name,
          index: panchanga.vaara.index,
          lord: panchanga.vaara.lord
        },

        // Additional info
        masa: {
          name: panchanga.masa.name,
          index: panchanga.masa.index,
          is_leap: panchanga.masa.is_leap
        },
        ritu: {
          name: panchanga.ritu.name,
          index: panchanga.ritu.index
        },
        samvatsara: {
          name: panchanga.samvatsara.name,
          index: panchanga.samvatsara.index
        }
      },

      // Muhurta timings
      muhurta: {
        auspicious: {
          abhijit: {
            start: formatTime12Hour(panchanga.abhijit_muhurta.start),
            end: formatTime12Hour(panchanga.abhijit_muhurta.end),
            description: 'Most auspicious time for all activities'
          }
        },
        inauspicious: {
          rahuKala: {
            start: formatTime12Hour(panchanga.rahu_kala.start),
            end: formatTime12Hour(panchanga.rahu_kala.end),
            description: 'Avoid important activities'
          },
          yamaGanda: {
            start: formatTime12Hour(panchanga.yama_ganda.start),
            end: formatTime12Hour(panchanga.yama_ganda.end),
            description: 'Not suitable for new beginnings'
          },
          gulikaKala: {
            start: formatTime12Hour(panchanga.gulika_kala.start),
            end: formatTime12Hour(panchanga.gulika_kala.end),
            description: 'Avoid auspicious activities'
          }
        }
      },

      // Astronomical data
      astronomical: {
        ayanamsha: {
          value: panchanga.ayanamsha,
          system: 'Lahiri'
        },
        dayDuration: formatTime12Hour(panchanga.day_duration),
        ahargana: panchanga.ahargana,
        sakaYear: panchanga.saka_year,
        kaliYear: panchanga.kali_year
      },

      // Planetary positions (if available)
      planets: planetary ? {
        positions: planetary.positions?.map((planet: any) => ({
          name: planet.planet,
          zodiacSign: planet.zodiac_sign,
          zodiacIndex: planet.zodiac_index,
          longitude: planet.longitude,
          nakshatra: planet.nakshatra,
          nakshatraIndex: planet.nakshatra_index,
          pada: planet.pada
        })),
        ascendant: planetary.ascendant ? {
          zodiacSign: planetary.ascendant.zodiac_sign,
          zodiacIndex: planetary.ascendant.zodiac_index,
          longitude: planetary.ascendant.longitude,
          nakshatra: planetary.ascendant.nakshatra,
          nakshatraIndex: planetary.ascendant.nakshatra_index,
          pada: planetary.ascendant.pada
        } : null
      } : null,

      // Vimsottari Dasha (if available)
      dasha: dasha ? {
        currentMahadasha: dasha.current_mahadasha ? {
          planet: dasha.current_mahadasha.planet,
          startDate: dasha.current_mahadasha.start_date,
          endDate: dasha.current_mahadasha.end_date,
          duration: dasha.current_mahadasha.duration_years
        } : null,
        allMahadashas: dasha.mahadashas?.map((d: any) => ({
          planet: d.planet,
          startDate: d.start_date,
          endDate: d.end_date,
          duration: d.duration_years
        }))
      } : null,

      // API metadata
      metadata: {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        source: 'Vedic Panchanga API',
        calculation_method: 'Drik Siddhanta (Swiss Ephemeris)'
      }
    };

    return NextResponse.json(completeData);

  } catch (error) {
    console.error('Error in complete API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch complete panchanga data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous';
    const rateLimitResult = await checkRateLimit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset
        },
        { status: 429 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date') || new Date().toISOString();
    const lat = parseFloat(searchParams.get('lat') || '12.9716');
    const lng = parseFloat(searchParams.get('lng') || '77.5946');
    const city = searchParams.get('city') || 'Bangalore';
    const timezone = searchParams.get('timezone') || 'Asia/Kolkata';

    // Call POST with the parameters
    const postRequest = new Request(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({
        date,
        location: {
          latitude: lat,
          longitude: lng,
          city,
          timezone
        }
      })
    });

    return POST(postRequest as NextRequest);

  } catch (error) {
    console.error('Error in GET complete API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch complete panchanga data' },
      { status: 500 }
    );
  }
}