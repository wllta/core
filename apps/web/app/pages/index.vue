<template>
  <UiPage>
    <h1 @click="goHome">Контент страницы</h1>
  </UiPage>
</template>

<script setup lang="ts">
const goHome = () => {
  navigateTo('/home')
}
</script>
