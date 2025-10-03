import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const tz = searchParams.get('tz');

    if (!year || !month || !day || !lat || !lon || !tz) {
      return NextResponse.json(
        { error: 'Missing required parameters: year, month, day, lat, lon, tz' },
        { status: 400 }
      );
    }

    // Path to Python script
    const scriptPath = path.join(process.cwd(), 'server', 'panchanga_calculator.py');

    // Call Python script
    const result = execSync(
      `python3 ${scriptPath} ${year} ${month} ${day} ${lat} ${lon} ${tz}`,
      { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 }
    );

    const data = JSON.parse(result);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Python panchanga:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate panchanga',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, location } = body;

    if (!date || !location || !location.latitude || !location.longitude) {
      return NextResponse.json(
        { error: 'Missing required fields: date, location.latitude, location.longitude' },
        { status: 400 }
      );
    }

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    // Calculate timezone offset in hours
    const tzOffset = -dateObj.getTimezoneOffset() / 60;

    // Path to Python script
    const scriptPath = path.join(process.cwd(), 'server', 'panchanga_calculator.py');

    // Call Python script
    const result = execSync(
      `python3 ${scriptPath} ${year} ${month} ${day} ${location.latitude} ${location.longitude} ${tzOffset}`,
      { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 }
    );

    const data = JSON.parse(result);

    // Add date and location to response
    data.date = date;
    data.location = location;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Python panchanga:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate panchanga',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
