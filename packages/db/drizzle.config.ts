import { defineConfig } from 'drizzle-kit'

import { env } from './src/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models',
  out: './drizzle',
  dbCredentials: {
    url: env.DB_URL,
  },
})
