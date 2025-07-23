export default defineNuxtConfig({
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

  // router: {
  //   options: {
  //     hashMode: true,
  //   },
  // },
})
