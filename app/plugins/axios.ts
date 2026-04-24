import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

/**
 * Global Axios instance configured via Nuxt Runtime Config.
 */

const api: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// use a Nuxt plugin to inject the runtime config into the axios instance
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  api.defaults.baseURL = config.public.apiBase as string;

  // Auth Interceptor
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (import.meta.client) {
      const token = localStorage.getItem("auth-token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && import.meta.client) {
        localStorage.removeItem("auth-token");
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      api,
    },
  };
});

export { api };
