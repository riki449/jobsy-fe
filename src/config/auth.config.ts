export const SESSION_COOKIE_NAME = "session";
export const TOKEN_STORAGE_KEY = "token"; // Deprecated for cookie, but kept for legacy
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.jobsy.dk";

export const USER_ROLES = {
  GUEST: "guest",
  USER: "user",
  COMPANY: "company",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// --- Route Configuration ---
export const PUBLIC_ROUTES = ["/login", "/register", "/", "/forgot-password"];

export const APP_ROUTES = {
  COMPANY_DASHBOARD: "/home", // Alias mapped to (portal)/home
  USER_DASHBOARD: "/user", // Alias mapped to (portal)/dashboard
} as const;
