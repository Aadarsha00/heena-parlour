/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/api.ts
import axios, { AxiosError } from "axios";
import { getAuthContextRef } from "../../context/AuthContext";

// Type for API error responses
interface ApiErrorResponse {
  code?: string;
  detail?: string;
  message?: string;
}

interface RefreshResponse {
  access: string;
  refresh?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

// Helper to check if token is valid (client-side validation)
const isTokenValid = (
  token: string | null,
  bufferSeconds: number = 30
): boolean => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime + bufferSeconds;
  } catch {
    return false;
  }
};

// Helper to handle logout
const handleLogout = () => {
  console.log("🚪 Logging out user...");

  // Clear tokens
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // Update auth context
  const authContext = getAuthContextRef();
  authContext.setAuthenticated?.(false);

  // Reset refresh state
  isRefreshing = false;
  failedQueue = [];

  // Redirect to login with small delay to prevent race conditions
  setTimeout(() => {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, 100);
};

// Centralized refresh token function
const performTokenRefresh = async (refreshToken: string): Promise<string> => {
  console.log("📡 Making refresh request...");

  // Create separate axios instance to avoid interceptor loops
  const refreshAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await refreshAPI.post<RefreshResponse>(
      "/auth/jwt/refresh/",
      {
        refresh: refreshToken,
      }
    );

    const { access, refresh: newRefresh } = response.data;

    if (!access) {
      throw new Error("No access token received");
    }

    // Store new tokens
    localStorage.setItem("access", access);
    if (newRefresh) {
      localStorage.setItem("refresh", newRefresh);
    }

    // Update auth context
    const authContext = getAuthContextRef();
    authContext.setAuthenticated?.(true);

    console.log("✅ Token refresh successful");
    return access;
  } catch (error) {
    console.error("❌ Refresh failed:", error);
    throw error;
  }
};

// Function to proactively refresh token if needed
export const ensureValidToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  // If access token is still valid, return it
  if (isTokenValid(accessToken, 60)) {
    // 1 minute buffer
    return accessToken;
  }

  // If no refresh token or it's expired, logout
  if (!isTokenValid(refreshToken, 30)) {
    // 30 second buffer
    console.log("❌ No valid refresh token available");
    handleLogout();
    return null;
  }

  // If already refreshing, wait for it
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  try {
    isRefreshing = true;
    const newAccessToken = await performTokenRefresh(refreshToken!);
    processQueue(null, newAccessToken);
    return newAccessToken;
  } catch (error) {
    processQueue(error, null);
    handleLogout();
    return null;
  } finally {
    isRefreshing = false;
  }
};

// REQUEST INTERCEPTOR - Only add token if it exists and is valid
api.interceptors.request.use(
  async (config) => {
    // For auth endpoints, don't add authorization header
    const isAuthEndpoint = config.url?.includes("/auth/");

    if (!isAuthEndpoint) {
      const accessToken = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh");

      // If no tokens exist (first-time user), proceed without auth
      if (!accessToken && !refreshToken) {
        console.log("🆕 No tokens found, proceeding without auth");
        return config;
      }

      // If tokens exist, try to ensure we have a valid one
      const token = await ensureValidToken();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      // If ensureValidToken returns null, it already handled logout
      // Just proceed without auth header (request will likely fail with 401)
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorData = error.response?.data as ApiErrorResponse;

    console.log("🚨 API Error:", {
      status: error.response?.status,
      code: errorData?.code,
      detail: errorData?.detail,
      url: originalRequest?.url,
      retry: originalRequest._retry,
    });

    // Don't retry auth endpoints
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    // Handle 401 errors for non-auth endpoints
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      // If already refreshing, queue the request
      if (isRefreshing) {
        console.log("🔄 Already refreshing, queueing request...");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      const refreshToken = localStorage.getItem("refresh");

      // Check if refresh token is valid
      if (!isTokenValid(refreshToken, 30)) {
        console.log("❌ No valid refresh token for retry");
        handleLogout();
        return Promise.reject(error);
      }

      try {
        isRefreshing = true;
        const newAccessToken = await performTokenRefresh(refreshToken!);

        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Failed to refresh token for retry:", refreshError);
        processQueue(refreshError, null);

        // Handle different refresh error scenarios
        const axiosError = refreshError as AxiosError<ApiErrorResponse>;
        if (
          axiosError.response?.status === 401 ||
          axiosError.response?.status === 400 ||
          axiosError.response?.status === 500
        ) {
          handleLogout();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For auth endpoint errors or other 401s, just pass through
    return Promise.reject(error);
  }
);

// Auto-refresh token periodically (every 10 minutes)
let refreshInterval: NodeJS.Timeout | null = null;

export const startTokenRefreshTimer = () => {
  // Clear existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  refreshInterval = setInterval(async () => {
    const refreshToken = localStorage.getItem("refresh");
    const accessToken = localStorage.getItem("access");

    // Only refresh if we have tokens and access token is expiring soon
    if (refreshToken && isTokenValid(refreshToken, 300)) {
      // 5 minutes buffer
      if (!isTokenValid(accessToken, 300)) {
        // Access token expires in 5 minutes
        console.log("⏰ Auto-refreshing token (scheduled)");
        try {
          await ensureValidToken();
        } catch (error) {
          console.error("⏰ Scheduled refresh failed:", error);
        }
      }
    }
  }, 10 * 60 * 1000); // Check every 10 minutes
};

export const stopTokenRefreshTimer = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};

export default api;
