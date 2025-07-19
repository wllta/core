<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-2xl font-bold mb-4">Ошибка авторизации</h1>
    <p class="mb-6 text-center">Не удалось войти через Telegram. Пожалуйста, попробуйте снова.</p>

    <button
        @click="retryAuth"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Попробовать снова
    </button>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

const retryAuth = async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await router.push('/')
  }
}
</script>