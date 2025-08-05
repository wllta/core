import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BOT_TOKEN: z.string(),
  APP_PORT: z.coerce.number().int().positive().default(3000),
  WEB_APP_URL: z.url({
    protocol: /^http?$/,
  }),
  IS_DEV: z.boolean(),
  // Axiom
  AXIOM_TOKEN: z.string(),
  AXIOM_DATASET_NAME: z.string(),
})

const envParsed = envSchema.safeParse({
  NODE_ENV: Bun.env.NODE_ENV,
  APP_PORT: Bun.env.APP_PORT,
  WEB_APP_URL: Bun.env.WEB_APP_URL,
  BOT_TOKEN: Bun.env.BOT_TOKEN,
  IS_DEV: Bun.env.NODE_ENV !== 'production',
  AXIOM_TOKEN: Bun.env.AXIOM_TOKEN,
  AXIOM_DATASET_NAME: Bun.env.AXIOM_DATASET_NAME,
})

if (!envParsed.success) {
  console.error('.env error:')

  envParsed.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
  })

  process.exit(1)
}

export const env = envParsed.data
