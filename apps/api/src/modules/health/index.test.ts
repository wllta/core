import { describe, expect, it } from 'bun:test'

import { api } from '@root'

describe('Elysia', () => {
  it('returns a response with timestamp within 1s', async () => {
    const { data, error } = await api.health.get()

    expect(error).toBeNull()
    expect(data).toHaveProperty('ts')

    const diff = Math.abs(Date.now() - data!.ts)

    expect(diff).toBeLessThanOrEqual(1000)
  })
})
