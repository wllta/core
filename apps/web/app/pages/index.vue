<script setup lang="ts">
const goHome = () => {
  navigateTo('/home')
}
</script>

<template>
  <UiPage :back="false">
    <UButton @click="goHome">Контент страницы</UButton>
  </UiPage>
</template>

