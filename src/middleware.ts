import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'tokens';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude login page and API routes from middleware
  if (pathname.startsWith('/login') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    
    if (!token) {
      throw new Error('No token found');
    }

    // Verify token
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    // Redirect to login page if token is invalid or missing
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}; 