import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  
  const path = request.nextUrl.pathname;
  // const publicPaths = ['', '/login', '/signup', '/blog/'];
  // const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
  const isPublicPath = path ==='' || path === '/' || path === '/login' || path === '/signup' ||  path.startsWith('/blog/');
  const token = request.cookies.get('token')?.value || '';

  // if (isPublicPath && token) {
  //   // Redirect to login page if it's not a public path and there's no token
  //   return NextResponse.redirect(new URL('', request.nextUrl));
  // }
  if (!isPublicPath && !token) {
    // Redirect to login page if it's not a public path and there's no token
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// Matcher paths
export const config = {
  matcher: [
    '/',
    '/create',
    '/blog/:path*',
    '/dashboard',
    '/login',
    '/signup',
  ],
};
