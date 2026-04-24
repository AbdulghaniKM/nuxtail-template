import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  srcDir: "app/",
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  css: ["assets/css/main.css"],
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/seo",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: 'Nuxtail',
    defaultLocale: 'en',
  },
  compatibilityDate: "2024-04-03",
});
