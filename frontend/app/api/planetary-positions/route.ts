import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, location } = body;

    if (!date || !location) {
      return NextResponse.json(
        { error: 'Date and location are required' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(date);

    // Convert location timezone string to offset
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

    // Call Python API
    const response = await fetch(`${API_BASE_URL}/planetary-positions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate planetary positions');
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error calculating planetary positions:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate planetary positions' },
      { status: 500 }
    );
  }
}

function getTimezoneOffset(timezoneString: string): number {
  const commonTimezones: Record<string, number> = {
    'Asia/Kolkata': 5.5,
    'Asia/Calcutta': 5.5,
    'Asia/Mumbai': 5.5,
    'Asia/Delhi': 5.5,
    'America/New_York': -5,
    'America/Los_Angeles': -8,
    'Europe/London': 0,
  };

  return commonTimezones[timezoneString] ?? 5.5;
}
