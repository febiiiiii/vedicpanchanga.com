import { NextRequest, NextResponse } from 'next/server';
import { searchCity } from '@/lib/api-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { city_name } = body;

    if (!city_name) {
      return NextResponse.json(
        { error: 'City name is required' },
        { status: 400 }
      );
    }

    const cities = await searchCity(city_name);

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error searching city:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to search city' },
      { status: 500 }
    );
  }
}
