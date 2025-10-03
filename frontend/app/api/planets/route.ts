import { NextRequest, NextResponse } from 'next/server';
import { calculatePlanetaryPositions } from '@/lib/calculations';
import { checkRateLimit } from '@/lib/rate-limit';

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

    const positions = calculatePlanetaryPositions(new Date(date));

    return NextResponse.json({ positions });
  } catch (error) {
    console.error('Error calculating planetary positions:', error);
    return NextResponse.json(
      { error: 'Failed to calculate planetary positions' },
      { status: 500 }
    );
  }
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
    const { date } = body;

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const positions = calculatePlanetaryPositions(new Date(date));

    return NextResponse.json({ positions });
  } catch (error) {
    console.error('Error calculating planetary positions:', error);
    return NextResponse.json(
      { error: 'Failed to calculate planetary positions' },
      { status: 500 }
    );
  }
}