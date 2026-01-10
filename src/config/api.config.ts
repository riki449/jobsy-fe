/**
 * API Configuration
 * Central configuration file for all API-related settings
 */

/**
 * Base API URL
 * Can be overridden by NEXT_PUBLIC_API_BASE_URL environment variable
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://185.121.173.207:5172/api";

/**
 * API Request Timeout (in milliseconds)
 */
export const API_TIMEOUT = 30000;

/**
 * API Version
 */
export const API_VERSION = "v1";

/**
 * Token Storage Key
 */
export const TOKEN_STORAGE_KEY = "token";
