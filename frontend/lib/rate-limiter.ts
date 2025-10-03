import { NextRequest } from 'next/server';

// Store for tracking requests (in-memory)
const requestStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Get client IP address from request
 */
export function getClientIp(request: NextRequest): string {
  // Try to get IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = request.headers.get('x-client-ip');

  // Return first available IP or 'anonymous'
  const ip = forwardedFor?.split(',')[0].trim() || realIp || clientIp || 'anonymous';
  return ip;
}

/**
 * Check rate limit for a request
 * Allows 10 requests per 10 seconds per IP
 */
export async function checkRateLimit(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  const windowMs = 10 * 1000; // 10 seconds
  const max = 10; // 10 requests per window

  // Get or create entry for this IP
  let entry = requestStore.get(ip);

  if (!entry || now > entry.resetTime) {
    // New window
    entry = { count: 1, resetTime: now + windowMs };
  } else {
    // Increment in current window
    entry.count++;
  }

  requestStore.set(ip, entry);

  // Clean up old entries if too many
  if (requestStore.size > 100) {
    const cutoff = now - 60000;
    requestStore.forEach((value, key) => {
      if (value.resetTime < cutoff) {
        requestStore.delete(key);
      }
    });
  }

  return {
    success: entry.count <= max,
    limit: max,
    remaining: Math.max(0, max - entry.count),
    reset: entry.resetTime,
  };
}