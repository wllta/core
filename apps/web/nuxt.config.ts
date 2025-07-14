// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
        port: 24678,
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    https: false,
    url: 'http://localhost:3000',
  },

  modules: ['@nuxt/image', '@nuxt/scripts', '@nuxt/test-utils', '@nuxt/ui'],
})
