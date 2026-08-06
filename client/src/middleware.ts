import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Remove X-Frame-Options to allow iframe embedding from any origin
  response.headers.delete('X-Frame-Options');
  response.headers.delete('x-frame-options');

  // Optionally set Content-Security-Policy frame-ancestors to allow all
  // response.headers.set('Content-Security-Policy', "frame-ancestors *");

  return response;
}

export const config = {
  matcher: '/(.*)',
};
