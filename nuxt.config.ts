import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/seo",
  ],
});