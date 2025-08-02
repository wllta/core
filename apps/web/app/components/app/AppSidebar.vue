<script setup lang="ts">
import { ref, watch } from 'vue'

import { assets } from '~/shared/assets'

const localePath = useLocalePath()

const tabs = [
  { nameKey: 'overview', route: '/', icon: 'i-heroicons-home' },
  { nameKey: 'analytics', route: '/analytics', icon: 'i-heroicons-chart-bar' },
  {
    nameKey: 'transactions',
    route: '/transactions',
    icon: 'i-heroicons-arrows-right-left',
  },
  { nameKey: 'rating', route: '/rating', icon: 'i-heroicons-trophy' },
  {
    nameKey: 'secret',
    route: '/secret',
    icon: 'i-heroicons-question-mark-circle',
    disabled: true,
  },
]

const isCollapsed = ref(false)
const sidebarWidth = ref(256)
const isResizing = ref(false)
const startX = ref(0)
const startWidth = ref(0)

const startResize = (e: MouseEvent) => {
  isResizing.value = true
  startX.value = e.clientX
  startWidth.value = sidebarWidth.value
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  e.preventDefault()
}

const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return

  const dx = e.clientX - startX.value
  let newWidth = startWidth.value + dx
  newWidth = Math.max(64, Math.min(newWidth, 400))

  sidebarWidth.value = newWidth
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

watch(sidebarWidth, (w) => {
  isCollapsed.value = w <= 64
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  if (isCollapsed.value) sidebarWidth.value = 64
  else sidebarWidth.value = 256
}
</script>

<template>
  <aside
      class="h-screen flex flex-col sticky top-0 transition-[width] duration-300 ease-in-out"
      :class="{ 'transition-[width] duration-300 ease-in-out': !isResizing }"
      :style="{ width: `${sidebarWidth}px` }"
  >
    <div
        v-if="!isCollapsed"
        class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-transparent hover:bg-primary-500 active:bg-primary-600 z-20"
        @mousedown="startResize"
    />

    <div class="flex items-center justify-between h-16 px-4 shrink-0">
      <div v-if="!isCollapsed" class="flex items-center gap-2 overflow-hidden">
        <img
            v-if="sidebarWidth > 120"
            :src="assets.miniLogo"
            alt="logo"
            class="h-16 w-16 shrink-0"
        />
        <transition name="fade">
          <span
              v-if="!isCollapsed"
              class="font-semibold text-base truncate whitespace-nowrap"
          >
            Wallet Analytic
          </span>
        </transition>
      </div>
      <button
          @click="toggleSidebar"
          class="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
      >
        <UIcon
            :name="isCollapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-left'"
            class="text-lg"
        />
      </button>
    </div>


    <nav class="flex-1 overflow-y-auto py-2 px-2 space-y-1">
      <NuxtLink
          v-for="tab in tabs"
          :key="tab.nameKey"
          :to="localePath(tab.route)"
          class="flex items-center h-10 px-3 rounded-md group relative transition-colors duration-150"
          :class="{
          'font-medium bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300': $route.path === localePath(tab.route),
          'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800': $route.path !== localePath(tab.route),
          'opacity-50 pointer-events-none': tab.disabled
        }"
      >
        <UIcon
            :name="tab.icon"
            class="text-xl flex-shrink-0 transition-transform"
            :class="{ 'mr-3': !isCollapsed, 'mx-auto': isCollapsed }"
        />
        <span
            class="text-sm font-medium truncate transition-all duration-300 ease-in-out"
            :class="{
            'opacity-0 max-w-0 overflow-hidden': isCollapsed,
            'opacity-100 max-w-[200px]': !isCollapsed
          }"
        >
          {{ $t(tab.nameKey) }}
        </span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
