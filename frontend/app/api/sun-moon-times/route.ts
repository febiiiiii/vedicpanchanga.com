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
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Path to Python script
    const scriptPath = path.join(process.cwd(), 'server', 'panchanga_calculator.py');

    // Call Python script
    const result = execSync(
      `python3 ${scriptPath} ${year} ${month} ${day} ${lat} ${lon} ${tz}`,
      { encoding: 'utf-8' }
    );

    const data = JSON.parse(result);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Python panchanga:', error);
    return NextResponse.json(
      { error: 'Failed to calculate sun/moon times' },
      { status: 500 }
    );
  }
}
