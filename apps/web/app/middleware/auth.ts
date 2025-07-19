export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (to.meta.public) {
    return
  }

  if (!auth.initialized) {
    await auth.initialize()
  }

  if (!auth.isAuthenticated) {
    if (to.path !== '/') {
      return navigateTo('/', { replace: true })
    }
  }
})
