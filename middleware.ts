import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { APP_ROUTES, PUBLIC_ROUTES, SESSION_COOKIE_NAME, USER_ROLES } from "./src/config/auth.config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Check Auth Token
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  
  // Helper to decode Role (Client-side decoding for speed in middleware)
  let role = USER_ROLES.GUEST;
  
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = JSON.parse(atob(base64));
      
      // LOGIC: default_company_view == 0 -> USER, ELSE -> COMPANY
      const companyView = Number(jsonPayload.default_company_view || 0);
      role = (companyView === 0 ? USER_ROLES.USER : USER_ROLES.COMPANY) as any;
      
    } catch (e) {
      // Invalid token, treat as guest
      role = USER_ROLES.GUEST;
    }
  }

  // 2. Route Protection Logic

  // Case A: User is Guest (Not Logged In)
  // Can only access Public Routes.
  // If trying to access protected routes -> Redirect to Login
  if (role === USER_ROLES.GUEST) {
    const isPublic = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith("/public") || pathname.startsWith("/images"));
    if (!isPublic) {
      // Store original url to redirect back after login
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Case B: User is Logged In
  // Prevent access to Login page again AND redirect root to dashboard
  if (pathname === "/login" || pathname === "/register" || pathname === "/") {
      const homeUrl = role === USER_ROLES.COMPANY ? APP_ROUTES.COMPANY_DASHBOARD : APP_ROUTES.USER_DASHBOARD;
      return NextResponse.redirect(new URL(homeUrl, request.url));
  }

  // Case C: Role Based Access Control
  
  // Scenario: "User" role trying to access Company Area
  if (role === USER_ROLES.USER && pathname.startsWith(APP_ROUTES.COMPANY_DASHBOARD)) {
     // Redirect back to User Dashboard
     return NextResponse.redirect(new URL(APP_ROUTES.USER_DASHBOARD, request.url));
  }

  // Scenario: "Company" role trying to access User Area
  // (Assuming strict separation. If Company can view User area, remove this)
  if (role === USER_ROLES.COMPANY && pathname.startsWith(APP_ROUTES.USER_DASHBOARD)) {
     return NextResponse.redirect(new URL(APP_ROUTES.COMPANY_DASHBOARD, request.url));
  }

  return NextResponse.next();
}

// Ensure middleware runs on relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
