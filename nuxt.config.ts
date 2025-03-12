// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site:  {url: 'https://test.wyrwoj.website'},
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "@nuxtjs/sitemap"],
  css: ['~/assets/css/main.css'],
  // components: true,
  components: [
    '~/components', // Default components directory
    { path: '~/components/form_info_icons/', extensions: ['vue'] }, // Nested directory
  ],
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        }
      ]
    }
  }
})
