<template>
  <div class="flex items-center justify-center h-screen">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-red-500">Ошибка авторизации</h2>
      </template>

      <p>{{ auth.error }}</p>

      <template #footer>
        <UButton
            @click="retryAuth"
            color="primary"
            block
        >
          Повторить попытку
        </UButton>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

const retryAuth = async () => {
  await auth.initialize()
  if (auth.isAuthenticated) {
    await navigateTo('/home')
  }
}
</script>