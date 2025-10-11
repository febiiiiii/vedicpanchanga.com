import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Extract request information and add to headers for API routes to log
  // Priority: CF-Connecting-IP (Cloudflare) > X-Forwarded-For > X-Real-IP
  const ip = request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Get Cloudflare metadata
  const country = request.headers.get('cf-ipcountry') || '';
  const cfRay = request.headers.get('cf-ray') || '';
  const cfCacheStatus = request.headers.get('cf-cache-status') || '';
  const cfDeviceType = request.headers.get('cf-device-type') || '';

  // Extract protocol from CF-Visitor header (JSON format)
  let protocol = '';
  const cfVisitor = request.headers.get('cf-visitor');
  if (cfVisitor) {
    try {
      const visitor = JSON.parse(cfVisitor);
      protocol = visitor.scheme || '';
    } catch {
      // Ignore parse errors
    }
  }

  // Clone request and add custom headers with request metadata
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-client-ip', ip);
  requestHeaders.set('x-client-country', country);
  requestHeaders.set('x-cf-ray', cfRay);
  requestHeaders.set('x-cf-cache-status', cfCacheStatus);
  requestHeaders.set('x-cf-device-type', cfDeviceType);
  requestHeaders.set('x-protocol', protocol);
  requestHeaders.set('x-request-timestamp', new Date().toISOString());

  // Process the request with additional headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// Configure which routes to log
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public assets (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
