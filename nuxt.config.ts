import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@nuxtjs/i18n", '@vueuse/nuxt'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API,
      BASE_URL: process.env.BASE_URL,
    },
  },
});