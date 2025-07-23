<template>
  <UApp>
    <AppLoader
        v-if="showLoader"
    />

    <AppAuthErrorPage
        v-else-if="auth.error"
        :error="auth.error"
        @retry="retryAuth"
    />

    <ClientOnly v-else>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </ClientOnly>
  </UApp>
</template>

<script setup lang="ts">
import { init } from '~/core/init'

import './core/mockEnv.ts'

const auth = useAuthStore()
const isLoading = ref(true)

const showLoader = computed(() => auth.loading || isLoading.value)

const retryAuth = async () => {
  isLoading.value = true
  try {
    await auth.initialize()
  } finally {
    isLoading.value = false
  }
}

watch(
  () => auth.error,
  (newVal, oldVal) => {
    console.log('Error changed:', newVal)
    console.log('Error oldVal:', oldVal)
  },
)

const hasInitialized = ref(false)

onMounted(async () => {
  if (hasInitialized.value) {
    return
  }

  hasInitialized.value = true

  try {
    await init()
    await auth.initialize()
  } catch (error) {
    console.error('Initialization failed:', error)
  } finally {
    isLoading.value = false
  }
})
</script>