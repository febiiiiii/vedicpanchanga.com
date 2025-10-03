import { NextRequest, NextResponse } from 'next/server';
import { calculatePanchanga, convertLocationToInput, type PanchangaRequest, formatTime12Hour } from '@/lib/api-client';
import { checkRateLimit } from '@/lib/rate-limit';

// Helper to determine paksha from tithi index
const getPaksha = (tithiIndex: number): 'Shukla' | 'Krishna' => {
  return tithiIndex <= 15 ? 'Shukla' : 'Krishna';
};

// Calculate percentage (simplified - based on time in current tithi)
const calculatePercentage = () => {
  return Math.random() * 100; // TODO: Calculate actual percentage based on tithi timing
};

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

    // Convert location timezone to offset
    const locationInput = convertLocationToInput(
      location.latitude,
      location.longitude,
      location.timezone || 'Asia/Kolkata',
      parsedDate
    );

    // Prepare request for Python API
    const panchangaRequest: PanchangaRequest = {
      date: {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate()
      },
      location: locationInput
    };

    // Call Python API
    const pythonResponse = await calculatePanchanga(panchangaRequest);

    // Transform Python API response to match frontend expectations
    const transformed = {
      date: parsedDate,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone || 'Asia/Kolkata',
        city: location.city || 'Unknown',
        country: location.country || ''
      },
      sunrise: formatTime12Hour(pythonResponse.sunrise),
      sunset: formatTime12Hour(pythonResponse.sunset),
      moonrise: formatTime12Hour(pythonResponse.moonrise),
      moonset: formatTime12Hour(pythonResponse.moonset),
      tithi: {
        name: pythonResponse.tithi.name,
        index: pythonResponse.tithi.index,
        paksha: getPaksha(pythonResponse.tithi.index),
        endTime: formatTime12Hour(pythonResponse.tithi.end_time),
        percentage: calculatePercentage()
      },
      nakshatra: {
        name: pythonResponse.nakshatra.name,
        index: pythonResponse.nakshatra.index,
        pada: 1, // TODO: Get from Python API
        endTime: formatTime12Hour(pythonResponse.nakshatra.end_time),
        lord: 'N/A', // TODO: Calculate based on index
        percentage: calculatePercentage()
      },
      yoga: {
        name: pythonResponse.yoga.name,
        index: pythonResponse.yoga.index,
        endTime: formatTime12Hour(pythonResponse.yoga.end_time)
      },
      karana: {
        name: pythonResponse.karana.name,
        index: pythonResponse.karana.index,
        endTime: formatTime12Hour(pythonResponse.karana.end_time)
      },
      vaara: {
        name: pythonResponse.vaara.name,
        index: pythonResponse.vaara.index,
        lord: pythonResponse.vaara.lord
      },
      ayanamsha: pythonResponse.ayanamsha,
      rahuKala: {
        start: formatTime12Hour(pythonResponse.rahu_kala.start),
        end: formatTime12Hour(pythonResponse.rahu_kala.end)
      },
      yamaGanda: {
        start: formatTime12Hour(pythonResponse.yama_ganda.start),
        end: formatTime12Hour(pythonResponse.yama_ganda.end)
      },
      gulikaKala: {
        start: formatTime12Hour(pythonResponse.gulika_kala.start),
        end: formatTime12Hour(pythonResponse.gulika_kala.end)
      },
      abhijitMuhurta: {
        start: formatTime12Hour(pythonResponse.abhijit_muhurta.start),
        end: formatTime12Hour(pythonResponse.abhijit_muhurta.end)
      },
      durmuhurta: [],
      // Additional data from Python API
      masa: pythonResponse.masa,
      ritu: pythonResponse.ritu,
      samvatsara: pythonResponse.samvatsara,
      ahargana: pythonResponse.ahargana,
      saka_year: pythonResponse.saka_year,
      kali_year: pythonResponse.kali_year
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error('Error calculating panchanga:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate panchanga' },
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

    const parsedDate = new Date(date);

    // Convert location timezone to offset
    const locationInput = convertLocationToInput(lat, lng, timezone, parsedDate);

    // Prepare request for Python API
    const panchangaRequest: PanchangaRequest = {
      date: {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate()
      },
      location: locationInput
    };

    // Call Python API
    const pythonResponse = await calculatePanchanga(panchangaRequest);

    // Transform response
    const transformed = {
      date: parsedDate,
      location: {
        latitude: lat,
        longitude: lng,
        timezone,
        city,
        country: ''
      },
      sunrise: formatTime12Hour(pythonResponse.sunrise),
      sunset: formatTime12Hour(pythonResponse.sunset),
      moonrise: formatTime12Hour(pythonResponse.moonrise),
      moonset: formatTime12Hour(pythonResponse.moonset),
      tithi: {
        name: pythonResponse.tithi.name,
        index: pythonResponse.tithi.index,
        paksha: getPaksha(pythonResponse.tithi.index),
        endTime: formatTime12Hour(pythonResponse.tithi.end_time),
        percentage: calculatePercentage()
      },
      nakshatra: {
        name: pythonResponse.nakshatra.name,
        index: pythonResponse.nakshatra.index,
        pada: 1,
        endTime: formatTime12Hour(pythonResponse.nakshatra.end_time),
        lord: 'N/A',
        percentage: calculatePercentage()
      },
      yoga: {
        name: pythonResponse.yoga.name,
        index: pythonResponse.yoga.index,
        endTime: formatTime12Hour(pythonResponse.yoga.end_time)
      },
      karana: {
        name: pythonResponse.karana.name,
        index: pythonResponse.karana.index,
        endTime: formatTime12Hour(pythonResponse.karana.end_time)
      },
      vaara: {
        name: pythonResponse.vaara.name,
        index: pythonResponse.vaara.index,
        lord: pythonResponse.vaara.lord
      },
      ayanamsha: pythonResponse.ayanamsha,
      rahuKala: {
        start: formatTime12Hour(pythonResponse.rahu_kala.start),
        end: formatTime12Hour(pythonResponse.rahu_kala.end)
      },
      yamaGanda: {
        start: formatTime12Hour(pythonResponse.yama_ganda.start),
        end: formatTime12Hour(pythonResponse.yama_ganda.end)
      },
      gulikaKala: {
        start: formatTime12Hour(pythonResponse.gulika_kala.start),
        end: formatTime12Hour(pythonResponse.gulika_kala.end)
      },
      abhijitMuhurta: {
        start: formatTime12Hour(pythonResponse.abhijit_muhurta.start),
        end: formatTime12Hour(pythonResponse.abhijit_muhurta.end)
      },
      durmuhurta: []
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error('Error calculating panchanga:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate panchanga' },
      { status: 500 }
    );
  }
}
