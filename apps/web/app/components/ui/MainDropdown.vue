<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'
import { openLink } from '@telegram-apps/sdk'

import { GITHUB_PROJECT_URL } from '~/config/constants/urls'

const { t, locale, locales, setLocale } = useI18n()

const dropdownItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: t('settings.settings'),
      icon: 'i-lucide-cog',
      onSelect: () => navigateTo('/settings'),
    },
    {
      label: t('settings.language'),
      icon: 'i-lucide-languages',
      children: locales.value.map((l) => ({
        label: l.name,
        onSelect: () => setLocale(l.code),
        active: locale.value === l.code,
      })),
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      onSelect: () =>
        openLink(GITHUB_PROJECT_URL, {
          tryInstantView: true,
        }),
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true,
    },
  ],
])
</script>

<template>
  <UDropdownMenu :items="dropdownItems" :ui="{ content: 'w-64' }">
    <template #default>
      <UButton color="neutral" variant="ghost" class="p-2">
        <UIcon
            name="i-heroicons-cog-6-tooth"
            class="w-6 h-6 text-current"
        />
      </UButton>
    </template>
  </UDropdownMenu>
</template>