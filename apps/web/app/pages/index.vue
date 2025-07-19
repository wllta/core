<template>
  <div class="flex items-center justify-center h-screen">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-xl font-semibold text-center">Главная</h2>
      </template>

      <div class="space-y-4 text-center">
        <p v-if="auth.loading">Проверка авторизации...</p>
        <p v-else-if="auth.error" class="text-red-500">{{ auth.error }}</p>
        <p v-else-if="auth.isAuthenticated">Вы авторизованы!</p>
        <p v-else>Пожалуйста, авторизуйтесь</p>

        <UProgress v-if="auth.loading" />
      </div>

      <template #footer>
        <div class="flex flex-col space-y-2">
          <UButton
              v-if="auth.error"
              @click="retryAuth"
              color="primary"
              block
              :loading="auth.loading"
              :disabled="auth.loading"
          >
            <template #leading v-if="auth.loading">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
            </template>
            {{ auth.loading ? 'Проверка...' : 'Повторить попытку' }}
          </UButton>

          <UButton
              v-if="auth.isAuthenticated && !auth.loading"
              @click="goHome"
              block
          >
            <UIcon name="i-heroicons-home" class="mr-2" />
            Домой
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

const retryAuth = async () => {
  try {
    await auth.initialize()
    if (auth.isAuthenticated) {
      await navigateTo('/home')
    }
  } catch (error) {
    console.error('Auth error:', error)
  }
}

const goHome = () => {
  navigateTo('/home')
}
</script>