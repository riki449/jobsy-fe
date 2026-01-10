import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_BASE_URL, API_TIMEOUT, TOKEN_STORAGE_KEY } from "../config/api.config";

/**
 * Axios instance with centralized configuration
 * Used for all API requests throughout the application
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Automatically adds authentication token to all requests
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles common error cases globally
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle unauthorized access
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    // Handle server errors
    if (error.response?.status && error.response.status >= 500) {
      console.error("Server error:", error.response);
    }

    return Promise.reject(error);
  }
);
