<template>
  <div>
    <NuxtPage/>
<!--    <ClientOnly>-->
<!--      <div v-if="authStore.loading" class="fixed inset-0 flex items-center justify-center bg-white/80 z-50">-->
<!--        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>-->
<!--      </div>-->
<!--    </ClientOnly>-->
  </div>
</template>

<script setup lang="ts">
import { init, postEvent, targetOrigin } from '@telegram-apps/sdk-vue'

const authStore = useAuthStore()
targetOrigin.set('https://tgl.mini-apps.store')
postEvent('web_app_ready')
// postEvent('web_app_expand')
// init()

onMounted(() => {
  try {
    init()
  } catch (e) {
    console.log(e)
  }

  authStore.initialize()
})
</script>