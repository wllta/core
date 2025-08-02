<script setup lang="ts">
import { useRouter } from 'vue-router'
import { backButton, onBackButtonClick } from '@telegram-apps/sdk-vue'

const props = withDefaults(
  defineProps<{
    back?: boolean
    preserveMainButton?: boolean
  }>(),
  {
    back: true,
    preserveMainButton: false,
  },
)

const emit = defineEmits<{
  (e: 'back'): void
}>()

const router = useRouter()
let cleanupBackButton: (() => void) | undefined

watch(
  () => props.back,
  (back) => {
    if (cleanupBackButton) cleanupBackButton()
    if (!back) return backButton.hide()

    backButton.show()
    cleanupBackButton = onBackButtonClick(() => {
      emit('back')
      router.go(-1)
    })
  },
  { immediate: true },
)

onUnmounted(() => cleanupBackButton?.())
</script>

<template>
  <div class="page">
    <slot/>
  </div>
</template>

<style>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: calc(var(--safe-area-inset-top) + 35px) var(--safe-area-inset-right) calc(var(--safe-area-inset-bottom) + 35px) var(--safe-area-inset-left);

  border-radius: 0.5rem;
  border: 1px solid var(--ui-error);

  background-color: var(--color-brand-dark);

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05),
  0 1px 3px 1px rgba(0, 0, 0, 0.1);
}

.dark .page {
  border-color: var(--color-dark);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3),
  0 1px 5px 1px rgba(0, 0, 0, 0.15);
}
</style>
