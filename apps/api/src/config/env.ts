import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  APP_PORT: z.coerce.number().int().positive().default(3000),
  WEB_APP_URL: z.url({
    protocol: /^https?$/,
  }),
})

const envParsed = envSchema.safeParse({
  NODE_ENV: Bun.env.NODE_ENV,
  APP_PORT: Bun.env.APP_PORT,
  WEB_APP_URL: Bun.env.WEB_APP_URL,
})

if (!envParsed.success) {
  console.error('.env error:')

  envParsed.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
  })

  process.exit(1)
}

export const env = envParsed.data
