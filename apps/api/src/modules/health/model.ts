import { t } from 'elysia'

export const HealthModel = t.Object({
  ts: t.Number({ examples: Date.now() }),
})
