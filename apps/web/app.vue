<template>
  <div>
    <p v-if="pending">Загрузка...</p>
    <p v-else-if="error">Ошибка: {{ error.message }}</p>
    <p v-else>{{ data }}</p>
  </div>
</template>

<script setup lang="ts">
import { client, parseApiError } from '#shared/api'

const { data, pending, error } = await useAsyncData(
  'user-all',
  async () => {
    const res = await client.user.all.get()

    if (res.error || !res.data) {
      throw new Error(parseApiError(res.error))
    }

    return res.data.name
  },
  { server: false },
)
</script>