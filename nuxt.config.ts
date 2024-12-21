// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "@nuxtjs/sitemap"],
  css: ['~/assets/css/main.css'],
  components: true,
})
