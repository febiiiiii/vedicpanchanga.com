import { NextRequest, NextResponse } from 'next/server';
import { searchCities, getPopularCities, CITIES_BY_COUNTRY } from '@/lib/world-cities';
import { logError } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { city_name, action } = body;

    // Return popular cities for quick selection
    if (action === 'popular') {
      const popularCities = getPopularCities();
      return NextResponse.json(popularCities);
    }

    // Return all cities grouped by country
    if (action === 'all') {
      return NextResponse.json(CITIES_BY_COUNTRY);
    }

    // Search for specific city
    if (!city_name || city_name.trim().length < 2) {
      return NextResponse.json([]);
    }

    const cities = searchCities(city_name);

    // Map to expected format
    const formattedCities = cities.map(city => ({
      city: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone,
      region: city.region || city.country,
      population: city.population
    }));

    return NextResponse.json(formattedCities);
  } catch (error) {
    console.error('Error searching city:', error);

    // Log error with details
    const ip = request.headers.get('x-client-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    logError({
      timestamp: new Date().toISOString(),
      ip,
      endpoint: request.nextUrl.pathname,
      error: error instanceof Error ? error.message : 'Failed to search city',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to search city' },
      { status: 500 }
    );
  }
}
