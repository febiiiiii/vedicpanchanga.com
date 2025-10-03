// API Client for Drik Panchanga Python API
import { format } from 'date-fns';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface DateInput {
  year: number;
  month: number;
  day: number;
}

export interface LocationInput {
  latitude: number;
  longitude: number;
  timezone: number; // Timezone offset in hours
}

export interface PanchangaRequest {
  date: DateInput;
  location: LocationInput;
}

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TithiResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface NakshatraResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface YogaResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface KaranaResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface VaaraResponse {
  index: number;
  name: string;
}

export interface MasaResponse {
  index: number;
  name: string;
  is_leap: boolean;
}

export interface RituResponse {
  index: number;
  name: string;
}

export interface SamvatsaraResponse {
  index: number;
  name: string;
}

export interface PanchangaResponse {
  tithi: TithiResponse;
  nakshatra: NakshatraResponse;
  yoga: YogaResponse;
  karana: KaranaResponse;
  vaara: VaaraResponse;
  masa: MasaResponse;
  ritu: RituResponse;
  samvatsara: SamvatsaraResponse;
  sunrise: TimeValue;
  sunset: TimeValue;
  day_duration: TimeValue;
  ahargana: number;
  saka_year: number;
  kali_year: number;
}

export interface CityInfo {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CitySearchRequest {
  city_name: string;
}

/**
 * Calculate panchanga for a given date and location
 */
export async function calculatePanchanga(
  request: PanchangaRequest
): Promise<PanchangaResponse> {
  const response = await fetch(`${API_BASE_URL}/panchanga`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to calculate panchanga');
  }

  return response.json();
}

/**
 * Search for cities in the database
 */
export async function searchCity(cityName: string): Promise<CityInfo[]> {
  const response = await fetch(`${API_BASE_URL}/cities/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city_name: cityName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to search city');
  }

  return response.json();
}

/**
 * List all available cities
 */
export async function listCities(limit: number = 100): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/cities?limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  return response.json();
}

/**
 * Convert timezone string (e.g., "Asia/Kolkata") to offset in hours
 */
export function getTimezoneOffset(date: Date, timezoneString: string): number {
  try {
    // Create date in specified timezone
    const tzDate = new Date(
      date.toLocaleString('en-US', { timeZone: timezoneString })
    );
    // Create date in UTC
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));

    // Calculate offset in hours
    const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
    return offset;
  } catch (error) {
    console.error('Error calculating timezone offset:', error);
    return 0;
  }
}

/**
 * Format time value to string (HH:MM:SS)
 */
export function formatTime(time: TimeValue): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
}

/**
 * Format time in 12-hour format with AM/PM using date-fns (without seconds for better readability)
 */
export function formatTime12Hour(time: TimeValue): string {
  // Create a date object with the time
  const date = new Date();
  date.setHours(time.hours, time.minutes, time.seconds);
  // Format using date-fns: "6:12 AM" or "6:04 PM"
  return format(date, 'h:mm a');
}

/**
 * Format time with seconds in 12-hour format using date-fns
 */
export function formatTime12HourWithSeconds(time: TimeValue): string {
  // Create a date object with the time
  const date = new Date();
  date.setHours(time.hours, time.minutes, time.seconds);
  // Format using date-fns: "6:12:25 AM" or "6:04:42 PM"
  return format(date, 'h:mm:ss a');
}

/**
 * Helper to convert Location with timezone string to timezone offset
 */
export function convertLocationToInput(
  latitude: number,
  longitude: number,
  timezoneString: string,
  date: Date
): LocationInput {
  // For common Indian timezones
  const commonTimezones: Record<string, number> = {
    'Asia/Kolkata': 5.5,
    'Asia/Calcutta': 5.5,
    'Asia/Mumbai': 5.5,
    'Asia/Delhi': 5.5,
    'Asia/Kathmandu': 5.75,
    'Asia/Dhaka': 6,
    'Asia/Colombo': 5.5,
  };

  const offset = commonTimezones[timezoneString] ?? getTimezoneOffset(date, timezoneString);

  return {
    latitude,
    longitude,
    timezone: offset,
  };
}
