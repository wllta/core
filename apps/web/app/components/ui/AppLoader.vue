<template>
  <div
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm"
      :class="{ 'pointer-events-none': !blocking }"
  >
    <UProgress
        :value="modelValue"
        @update:modelValue="onUpdate"
        :animation="animation"
        :color="color"
        :size="size"
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
    modelValue?: number | null
    blocking?: boolean
    animation?: 'carousel' | 'swing'
    color?: string
    size?: string
    text?: string
    progressClass?: string
    textClass?: string
  }>(),
  {
    modelValue: null,
    blocking: true,
    animation: 'swing',
    color: 'primary',
    size: 'md',
    text: 'Пожалуйста, подождите...',
    progressClass: 'w-64',
    textClass: '',
  },
)

const emit = defineEmits(['update:modelValue'])

const onUpdate = (value: number | null) => {
  emit('update:modelValue', value)
}
</script>