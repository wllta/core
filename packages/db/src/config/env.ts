import { z } from 'zod'

const envSchema = z.object({
  DB_URL: z.string().min(1),
})

const envParsed = envSchema.safeParse({
  DB_URL: Bun.env.DB_URL,
})

if (!envParsed.success) {
  console.error('Validation error:', z.treeifyError(envParsed.error))
  throw new Error('Invalid environment variables')
}

export const env = envParsed.data
