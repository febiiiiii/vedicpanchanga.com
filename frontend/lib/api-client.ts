// API Client for Drik Panchanga Python API
import { format } from 'date-fns';

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
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
