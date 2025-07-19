import { defineStore } from 'pinia'

import { type TMAUser } from '@wallet-analytic/shared'

import { client } from '~/shared/api'

interface AuthState {
  user: TMAUser | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
  },

  actions: {
    async initialize(): Promise<void> {
      console.log('import.meta.client', import.meta.client)
      if (!import.meta.client) {
        return
      }

      this.loading = true

      try {
        const { data: user } = await client.auth.login.get()

        console.log('data', user)
        if (user) {
          this.user = user
        }
      } catch (err: unknown) {
        this.error =
          err instanceof Error ? err.message : 'Unknown error occurred'
      } finally {
        this.loading = false
      }
    },
  },
})
