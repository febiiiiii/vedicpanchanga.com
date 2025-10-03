import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8121';

// CORS headers for external API access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Helper to format time in 12-hour format
const formatTime = (time: { hours?: number; minutes?: number } | undefined | null): string => {
  if (!time) return 'N/A';
  let hours = time.hours || 0;
  const minutes = time.minutes || 0;

  // Handle times after midnight (hours >= 24)
  let nextDay = false;
  if (hours >= 24) {
    hours = hours - 24;
    nextDay = true;
  }

  const h = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const timeStr = `${h}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return nextDay ? `${timeStr} (+1)` : timeStr;
};

// Helper to convert timezone to offset
const getTimezoneOffset = (timezone: string = 'Asia/Kolkata'): number => {
  const timezoneOffsets: Record<string, number> = {
    'Asia/Kolkata': 5.5,
    'Asia/Calcutta': 5.5,
    'America/New_York': -5,
    'America/Los_Angeles': -8,
    'America/Chicago': -6,
    'America/Denver': -7,
    'America/Phoenix': -7,
    'America/Toronto': -5,
    'America/Vancouver': -8,
    'Europe/London': 0,
    'Europe/Paris': 1,
    'Asia/Dubai': 4,
    'Asia/Singapore': 8,
    'Asia/Tokyo': 9,
    'Australia/Sydney': 10,
  };

  // Try to get from mapping, otherwise calculate from current date
  if (timezone in timezoneOffsets) {
    return timezoneOffsets[timezone];
  }

  // Calculate offset from current timezone if possible
  try {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'shortOffset'
    });
    const parts = formatter.formatToParts(date);
    const offset = parts.find(p => p.type === 'timeZoneName')?.value;
    if (offset && offset.startsWith('GMT')) {
      const match = offset.match(/GMT([+-]\d{1,2}):?(\d{2})?/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        return hours + minutes / 60;
      }
    }
  } catch {
    console.warn(`Could not determine offset for timezone ${timezone}, using default`);
  }

  // Default to IST offset if unknown
  return 5.5;
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await checkRateLimit(request);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    const body = await request.json();
    const { date, location } = body;

    if (!date || !location) {
      return NextResponse.json(
        { error: 'Date and location are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const parsedDate = new Date(date);

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
        timezone: getTimezoneOffset(location.timezone)
      }
    };

    // Fetch all data in parallel
    const [panchangaRes, planetsRes, dashaRes] = await Promise.allSettled([
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

    // Process responses
    const panchanga = panchangaRes.status === 'fulfilled' && panchangaRes.value.ok
      ? await panchangaRes.value.json()
      : null;

    const planets = planetsRes.status === 'fulfilled' && planetsRes.value.ok
      ? await planetsRes.value.json()
      : null;

    const dasha = dashaRes.status === 'fulfilled' && dashaRes.value.ok
      ? await dashaRes.value.json()
      : null;

    if (!panchanga) {
      throw new Error('Failed to calculate panchanga');
    }

    // Build streamlined response
    const response = {
      // Basic info
      date: parsedDate.toISOString(),
      location: {
        ...location,
        timezone: location.timezone || 'Asia/Kolkata'
      },

      // Sun & Moon
      sun: {
        rise: formatTime(panchanga.sunrise),
        set: formatTime(panchanga.sunset)
      },
      moon: {
        rise: formatTime(panchanga.moonrise),
        set: formatTime(panchanga.moonset)
      },

      // Panchanga
      panchanga: {
        tithi: {
          name: panchanga.tithi.name,
          index: panchanga.tithi.index,
          paksha: panchanga.tithi.index <= 15 ? 'Shukla' : 'Krishna',
          endTime: formatTime(panchanga.tithi.end_time)
        },
        nakshatra: {
          name: panchanga.nakshatra.name,
          index: panchanga.nakshatra.index,
          endTime: formatTime(panchanga.nakshatra.end_time)
        },
        yoga: {
          name: panchanga.yoga.name,
          index: panchanga.yoga.index,
          endTime: formatTime(panchanga.yoga.end_time)
        },
        karana: {
          name: panchanga.karana.name,
          index: panchanga.karana.index,
          endTime: formatTime(panchanga.karana.end_time)
        },
        vaara: {
          name: panchanga.vaara.name,
          index: panchanga.vaara.index,
          lord: panchanga.vaara.lord
        }
      },

      // Calendar info
      calendar: {
        masa: panchanga.masa,
        ritu: panchanga.ritu,
        samvatsara: panchanga.samvatsara,
        ayanamsha: panchanga.ayanamsha,
        sakaYear: panchanga.saka_year,
        kaliYear: panchanga.kali_year
      },

      // Muhurta
      muhurta: {
        abhijit: {
          start: formatTime(panchanga.abhijit_muhurta.start),
          end: formatTime(panchanga.abhijit_muhurta.end)
        },
        rahuKala: {
          start: formatTime(panchanga.rahu_kala.start),
          end: formatTime(panchanga.rahu_kala.end)
        },
        yamaGanda: {
          start: formatTime(panchanga.yama_ganda.start),
          end: formatTime(panchanga.yama_ganda.end)
        },
        gulikaKala: {
          start: formatTime(panchanga.gulika_kala.start),
          end: formatTime(panchanga.gulika_kala.end)
        }
      },

      // Planetary positions (if available)
      planets: planets?.positions || null,
      ascendant: planets?.ascendant || null,

      // Dasha (if available)
      dasha: dasha?.current_mahadasha || null,

      // API info
      api: {
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json(response, { headers: corsHeaders });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const body = {
    date: searchParams.get('date') || new Date().toISOString(),
    location: {
      latitude: parseFloat(searchParams.get('lat') || '12.9716'),
      longitude: parseFloat(searchParams.get('lng') || '77.5946'),
      city: searchParams.get('city') || 'Bangalore',
      timezone: searchParams.get('tz') || 'Asia/Kolkata'
    }
  };

  const req = new Request(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  return POST(req as NextRequest);
}