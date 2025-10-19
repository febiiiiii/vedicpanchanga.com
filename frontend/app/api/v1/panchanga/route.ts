import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limiter';
import { logError, logRequest } from '@/lib/logger';
import { toZonedTime } from 'date-fns-tz';
import { getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8121';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

const formatTime = (time: { hours?: number; minutes?: number } | undefined | null): string => {
  if (!time) return 'N/A';
  let hours = time.hours || 0;
  const minutes = time.minutes || 0;

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


export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let status = 200;

  try {
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
    const userTimezone = location.timezone || 'America/Vancouver';

    // Convert UTC date to user's timezone using date-fns-tz
    const zonedDate = toZonedTime(parsedDate, userTimezone);

    const year = getYear(zonedDate);
    const month = getMonth(zonedDate) + 1; // getMonth() returns 0-11, we need 1-12
    const day = getDate(zonedDate);
    const hour = getHours(zonedDate);
    const minute = getMinutes(zonedDate);
    const second = getSeconds(zonedDate);

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
        timezone: location.timezone,
        city: location.city,
        country: location.country
      }
    };

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

    const response = {
      date: parsedDate.toISOString(),
      location: {
        ...location,
        timezone: location.timezone || 'Asia/Kolkata'
      },

      sun: {
        rise: formatTime(panchanga.sunrise),
        set: formatTime(panchanga.sunset)
      },
      moon: {
        rise: formatTime(panchanga.moonrise),
        set: formatTime(panchanga.moonset)
      },

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

      calendar: {
        masa: panchanga.masa,
        ritu: panchanga.ritu,
        samvatsara: panchanga.samvatsara,
        ayanamsha: panchanga.ayanamsha,
        sakaYear: panchanga.saka_year,
        kaliYear: panchanga.kali_year
      },

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

      planets: planets?.positions || null,
      ascendant: planets?.ascendant || null,
      birth_chart: panchanga.birth_chart || null,
      dasha: dasha?.current_mahadasha || null,

      api: {
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
    };

    logRequestData(request, status, startTime);

    return NextResponse.json(response, { headers: corsHeaders });

  } catch (error) {
    status = 500;

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

function logRequestData(request: NextRequest, status: number, startTime: number): void {
  const ip = request.headers.get('x-client-ip') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const country = request.headers.get('x-client-country') ||
    request.headers.get('cf-ipcountry') ||
    undefined;

  const duration = (Date.now() - startTime) / 1000;

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