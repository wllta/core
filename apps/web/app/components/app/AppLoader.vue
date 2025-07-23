<template>
  <div
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm pointer-events-none"
  >
    <UProgress
        class="mb-4"
        :class="progressClass"
    />
    <span
        v-if="text"
        class="text-sm font-medium"
        :class="textClass"
    >
      {{ text }}
    </span>

    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    progressClass?: string
    textClass?: string
  }>(),
  {
    text: 'App is loading...',
    progressClass: 'w-64',
    textClass: '',
  },
)
</script>