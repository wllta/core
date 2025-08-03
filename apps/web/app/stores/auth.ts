import { defineStore } from 'pinia'

import type { DBUser } from '@wallet-analytic/db'
import { type ErrorResponse } from '@wallet-analytic/shared'

import { client } from '~/shared/api'

interface AuthState {
  user: DBUser | null
  loading: boolean
  error: ErrorResponse | null
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
      if (!import.meta.client) {
        return
      }

      this.loading = true
      this.error = null

      try {
        const { data: user, error } = await client.auth.login.get()

        if (error) {
          this.error = error.value
          return
        }

        if (user) {
          this.user = user
        }
      } finally {
        this.loading = false
      }
    },
  },
})
