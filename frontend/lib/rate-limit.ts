import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter that allows 10 requests per 10 seconds
// For production, you should set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_URL.startsWith('https'))
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

// Create rate limiter if Redis is configured
export const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  : null;

// Helper function to check rate limit
export async function checkRateLimit(identifier: string) {
  if (!ratelimit) {
    // If rate limiting is not configured, allow the request
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }

  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

  return { success, limit, remaining, reset };
}