<template>
  <div class="relative min-h-screen">
    <AppLoader
        v-if="showLoader"
        :blocking="true"
        text="App is loading..."
    />

    <ClientOnly>
      <template v-if="!showLoader && !auth.error">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { postEvent, targetOrigin } from '@telegram-apps/sdk-vue'

import AppLoader from '~/components/ui/AppLoader.vue'

const auth = useAuthStore()
const isLoading = ref(true)

const showLoader = computed(() => auth.loading || isLoading.value)

onMounted(async () => {
  try {
    targetOrigin.set('https://tgl.mini-apps.store')
    postEvent('web_app_ready')

    await auth.initialize()
  } catch (error) {
    console.error('initialize error:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>