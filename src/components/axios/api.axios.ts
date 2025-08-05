// src/api/api.ts
import axios from "axios";
import { getAuthContextRef } from "../../context/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
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

    const isTokenError =
      error.response?.data?.code === "token_not_valid" &&
      error.response?.status === 401;

    if (isTokenError && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/jwt/refresh/`,
            { refresh: refreshToken }
          );

          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);

          // ✅ Update context
          getAuthContextRef().setAuthenticated?.(true);
          getAuthContextRef().refreshAuth?.();

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("🔁 Refresh token invalid", refreshError);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          getAuthContextRef().setAuthenticated?.(false);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        getAuthContextRef().setAuthenticated?.(false);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
