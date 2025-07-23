<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { viewport } from '@telegram-apps/sdk-vue'
type PageInsetName = 'top' | 'bottom' | 'left' | 'right'

interface Colors {
  header?: string
  background?: string
  bottomBar?: string
}

type ColorProp = Colors | string

interface Props {
  colors?: ColorProp
  insets?: boolean | PageInsetName[]
  onBack?: (() => void) | 'preserve' | 'disable'
  preserveMainButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  insets: true,
  onBack: undefined,
  preserveMainButton: false,
})

defineEmits<{
  (e: 'back'): void
}>()

const styleInsets = ref<Record<string, string>>({})

onMounted(() => {
  const styles: Record<string, string> = {}

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('top'))
  ) {
    const top = viewport.contentSafeAreaInsetTop?.()
    styles.paddingTop = `${top + 35}px`
  }

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('bottom'))
  ) {
    const bottom = viewport.contentSafeAreaInsetBottom?.()
    styles.paddingBottom = `${bottom + 35}px`
  }

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('left'))
  ) {
    const left = viewport.contentSafeAreaInsetLeft()
    styles.paddingLeft = `${left}px`
  }

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('right'))
  ) {
    const right = viewport.contentSafeAreaInsetRight?.()
    styles.paddingRight = `${right}px`
  }

  styleInsets.value = styles
})
</script>

<template>
  <div
      class="page"
      :style="styleInsets"
  >
    <slot />
  </div>

</template>
