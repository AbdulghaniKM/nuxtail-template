<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const appConfig = useAppConfig();
const { app, seo } = appConfig.nuxtail;

useHead({
  htmlAttrs: { lang: app.language },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: appConfig.nuxtail.icons.favicon,
    },
  ],
});

useSeoMeta({
  title: seo.title ?? app.title,
  titleTemplate: `%s`,
  description: seo.description ?? app.description,
  keywords: seo.keywords?.join(", "),
  robots: seo.robots,
  author: app.author,
  ogSiteName: seo.openGraph?.siteName ?? app.name,
  ogType: seo.openGraph?.type as any,
  ogLocale: seo.openGraph?.locale,
  ogTitle: seo.title ?? app.title,
  ogDescription: seo.description ?? app.description,
  ogUrl: app.url,
  twitterCard: seo.twitter?.card as any,
  twitterTitle: seo.title ?? app.title,
  twitterDescription: seo.description ?? app.description,
});
</script>
