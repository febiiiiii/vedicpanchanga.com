import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';
import { logError, logRequest } from '@/lib/logger';

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

// Helper to convert timezone to offset for a specific date
const getTimezoneOffset = (timezone: string = 'Asia/Kolkata', date: Date = new Date()): number => {
  try {
    // Use Intl.DateTimeFormat to get the offset for the specific date
    // This method properly handles DST transitions
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'longOffset',
      hour12: false
    });

    const parts = formatter.formatToParts(date);
    const timeZoneName = parts.find(p => p.type === 'timeZoneName')?.value;

    if (timeZoneName) {
      // Parse formats like "GMT+5:30", "GMT-8", "GMT+04:00", etc.
      const match = timeZoneName.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
      if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2]);
        const minutes = match[3] ? parseInt(match[3]) : 0;
        return sign * (hours + minutes / 60);
      }
    }

    // Fallback: Calculate offset by comparing UTC and local times
    const utcString = date.toISOString();
    const localString = date.toLocaleString('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // Parse the local string
    const [datePart, timePart] = localString.split(', ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    // Create a date in the local timezone (treating it as UTC for calculation)
    const localDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

    // Calculate offset in hours
    const offsetMs = localDate.getTime() - date.getTime();
    const offsetHours = offsetMs / (1000 * 60 * 60);

    // Round to nearest 15 minutes (0.25 hours) to handle fractional timezones
    return Math.round(offsetHours * 4) / 4;

  } catch (error) {
    console.warn(`Could not determine offset for timezone ${timezone}, using IST default`, error);
    // Default to IST offset if all methods fail
    return 5.5;
  }
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let status = 200;

  try {
    // Check rate limit
    const rateLimitResult = await checkRateLimit(request);

    if (!rateLimitResult.success) {
      status = 429;
      const response = NextResponse.json(
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

      // Log rate-limited request
      logRequestData(request, status, startTime);
      return response;
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

    // Convert to the user's timezone for extraction
    // parsedDate is in UTC, we need to get components in the user's local timezone
    const userTimezone = location.timezone || 'America/Vancouver';
    const userTimeString = parsedDate.toLocaleString('en-US', {
      timeZone: userTimezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // Parse the localized string: "MM/DD/YYYY, HH:MM:SS"
    const [datePart, timePart] = userTimeString.split(', ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    // Prepare request for Python API
    const apiRequest = {
      date: {
        year,
        month,
        day,
        hour,
        minute,
        second
      },
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,  // Send timezone name directly
        city: location.city,
        country: location.country
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

      // Birth chart (if available)
      birth_chart: panchanga.birth_chart || null,

      // Dasha (if available)
      dasha: dasha?.current_mahadasha || null,

      // API info
      api: {
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
    };

    // Log successful request
    logRequestData(request, status, startTime);

    return NextResponse.json(response, { headers: corsHeaders });

  } catch (error) {
    status = 500;
    console.error('API Error:', error);

    // Log error with details
    const ip = request.headers.get('x-client-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    logError({
      timestamp: new Date().toISOString(),
      ip,
      endpoint: request.nextUrl.pathname,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Log failed request
    logRequestData(request, status, startTime);

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

// Helper function to log request data
function logRequestData(request: NextRequest, status: number, startTime: number): void {
  const ip = request.headers.get('x-client-ip') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const country = request.headers.get('x-client-country') ||
    request.headers.get('cf-ipcountry') ||
    undefined;

  const duration = (Date.now() - startTime) / 1000; // seconds

  // Cloudflare headers
  const cfRay = request.headers.get('x-cf-ray') || request.headers.get('cf-ray') || undefined;
  const cfCacheStatus = request.headers.get('x-cf-cache-status') || request.headers.get('cf-cache-status') || undefined;
  const cfDeviceType = request.headers.get('x-cf-device-type') || request.headers.get('cf-device-type') || undefined;
  const protocol = request.headers.get('x-protocol') || undefined;

  logRequest({
    timestamp: new Date().toISOString(),
    ip,
    country,
    method: request.method,
    endpoint: request.nextUrl.pathname,
    query: request.nextUrl.search || '',
    referrer: request.headers.get('referer') || '',
    userAgent: request.headers.get('user-agent') || '',
    status,
    duration,
    cfRay,
    cfCacheStatus,
    cfDeviceType,
    protocol,
  });
}