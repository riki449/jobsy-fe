import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
    APP_ROUTES,
    PUBLIC_ROUTES,
    SESSION_COOKIE_NAME,
    USER_ROLES,
} from "./src/config/auth.config";
import { locales, defaultLocale } from "./src/i18n/request";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("COOKIE:", request.cookies.get(SESSION_COOKIE_NAME));

  // 1. Check Auth Token
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // Helper to decode Role (Client-side decoding for speed in middleware)
  let role = USER_ROLES.GUEST;

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(
        Buffer.from(base64, "base64").toString("utf-8")
      );

      // LOGIC: default_company_view == 0 -> USER, ELSE -> COMPANY
      const companyView = Number(jsonPayload.default_company_view || 0);
      role = (companyView === 0 ? USER_ROLES.USER : USER_ROLES.COMPANY) as any;
    } catch (e) {
      // Invalid token, treat as guest
      role = USER_ROLES.GUEST;
    }
  }

  // Extract locale from pathname (e.g., /en/dashboard -> en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale in path, let intl middleware handle it
  if (!pathnameHasLocale) {
    return intlMiddleware(request);
  }

  // Get the locale from pathname
  const locale = pathname.split("/")[1];

  // Remove locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  // 2. Route Protection Logic

  // Case A: User is Guest (Not Logged In)
  // Can only access Public Routes.
  // If trying to access protected routes -> Redirect to Login
  if (role === USER_ROLES.GUEST) {
    const isPublic = PUBLIC_ROUTES.some(
      (route) =>
        pathnameWithoutLocale === route ||
        pathnameWithoutLocale.startsWith("/public") ||
        pathnameWithoutLocale.startsWith("/images")
    );
    if (!isPublic) {
      // Store original url to redirect back after login
      const url = new URL(`/${locale}/login`, request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return intlMiddleware(request);
  }

  // Case B: User is Logged In
  // Prevent access to Login page again AND redirect root to dashboard
  if (pathnameWithoutLocale === "/login" || pathnameWithoutLocale === "/register" || pathnameWithoutLocale === "/") {
    const homeUrl =
      role === USER_ROLES.COMPANY
        ? `/${locale}${APP_ROUTES.COMPANY_DASHBOARD}`
        : `/${locale}${APP_ROUTES.USER_DASHBOARD}`;
    return NextResponse.redirect(new URL(homeUrl, request.url));
  }

  // Case C: Role Based Access Control

  // Scenario: "User" role trying to access Company Area
  if (
    role === USER_ROLES.USER &&
    pathnameWithoutLocale.startsWith(APP_ROUTES.COMPANY_DASHBOARD)
  ) {
    // Redirect back to User Dashboard
    return NextResponse.redirect(
      new URL(`/${locale}${APP_ROUTES.USER_DASHBOARD}`, request.url)
    );
  }

  // Scenario: "Company" role trying to access User Area
  // (Assuming strict separation. If Company can view User area, remove this)
  if (
    role === USER_ROLES.COMPANY &&
    pathnameWithoutLocale.startsWith(APP_ROUTES.USER_DASHBOARD)
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}${APP_ROUTES.COMPANY_DASHBOARD}`, request.url)
    );
  }

  return intlMiddleware(request);
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
     * - Static file extensions (svg, png, jpg, jpeg, gif, webp, ico, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)",
  ],
};
