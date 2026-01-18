/**
 * API Endpoints
 * Central location for all API endpoint definitions
 * Organized by feature/domain following best practices from large codebases
 */

/**
 * Authentication Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh",
  GET_LINKED_ACCOUNT: "/auth/get-linked-account",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
  SWAP_USER: "/auth/swap-view",
} as const;

/**
 * Job Endpoints
 */
export const JOB_ENDPOINTS = {
  SEARCH: "/job/search-job",
  DETAIL: (id: string) => `/job/${id}`,
  CREATE: "/job/create",
  UPDATE: (id: string) => `/job/${id}`,
  DELETE: (id: string) => `/job/${id}`,
  BIDS_SENT: "/job/bids-sent",
  BOOKING: "/job/booking",
} as const;

/**
 * Category Endpoints
 */
export const CATEGORY_ENDPOINTS = {
  LIST: "/categories",
  HAVE_JOBS: "/categories/have-jobs",
  DETAIL: (id: string) => `/categories/${id}`,
} as const;

/**
 * Action Endpoints
 */
export const ACTION_ENDPOINTS = {
  HAVA_JOBS: "/areas/actions/have-jobs",
} as const;

/**
 * Profile/User Endpoints
 */
export const USER_ENDPOINTS = {
  PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/change-password",
  UPLOAD_AVATAR: "/user/avatar",
} as const;

/**
 * Company Endpoints
 */
export const COMPANY_ENDPOINTS = {
  LIST: "/companies",
  DETAIL: (id: string) => `/companies/${id}`,
  REVIEWS: (id: string) => `/companies/${id}/reviews`,
} as const;

/**
 * Welcome/Homepage Endpoints
 */
export const WELCOME_ENDPOINTS = {
  FEATURED: "/home/featured",
  LATEST_REVIEWS: "/home/latest-reviews",
  TOP_COMPANIES: "/home/top-companies",
  TOTAL_USERS: "/stats/users/total",
  CATEGORY_BY_PARENT: (id: string) => `/get_category_by_parent/${id}`,
  HAPPENING_NOW: "/happening-now",
} as const;

/**
 * Combined API Endpoints
 * Exported as a single object for easy importing
 */
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  JOB: JOB_ENDPOINTS,
  CATEGORY: CATEGORY_ENDPOINTS,
  USER: USER_ENDPOINTS,
  COMPANY: COMPANY_ENDPOINTS,
  WELCOME: WELCOME_ENDPOINTS,
  ACTION_ENDPOINTS: ACTION_ENDPOINTS,
} as const;

/**
 * Type-safe endpoint builder helper
 */
export type ApiEndpoint = typeof API_ENDPOINTS;
