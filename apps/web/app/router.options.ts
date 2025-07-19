import type { RouterConfig } from '@nuxt/schema'

export default (<RouterConfig>{
  routes: (_routes) => [
    {
      path: '/',
      name: 'index',
      component: () => import('./pages/index.vue'),
      meta: { middleware: ['auth'] },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./pages/home.vue'),
      meta: { middleware: ['auth'] },
    },
    {
      path: '/auth-error',
      name: 'auth-error',
      component: () => import('./pages/auth-error.vue'),
      meta: { public: true },
    },
  ],
})
