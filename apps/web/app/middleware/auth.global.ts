export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (to.path.startsWith('/api')) {
    return
  }

  if (authStore.isAuthenticated || to.meta.public) {
    return
  }

  await authStore.initialize()

  console.log('authStore.isAuthenticated', authStore.isAuthenticated)
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth-error', { replace: true })
  }
})
