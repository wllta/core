export default defineNuxtConfig({
  // routeRules: {
  //   '/': { ssr: false },
  //   '/home': { ssr: false, prerender: false },
  //   '/auth-error': { ssr: false },
  // },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in', // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in', // default
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    server: {
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
  //
  devServer: {
    host: '0.0.0.0',
    port: 5174,
  },

  modules: [
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
})
