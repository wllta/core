import { describe, expect, it } from 'bun:test'

import { DEFAULT_BEARER_TMA_TOKEN, defaultUnauthorizedError } from '@tests'

import { api } from '@root'

describe('auth.login', () => {
  it('returns unauthorized without token', async () => {
    const { data, error } = await api.auth.login.get()

    expect(data).toBeNull()
    expect(error?.status).toBe(401)

    const { status, code, message } = defaultUnauthorizedError
    expect(error?.value).toMatchObject({ status, code, message })
  })

  it('returns unauthorized with invalid token', async () => {
    const { data, error } = await api.auth.login.get({
      headers: {
        Authorization: 'Bearer invalid-token',
      },
    })

    expect(data).toBeNull()
    expect(error?.status).toBe(401)

    const { status, code, message } = defaultUnauthorizedError
    expect(error?.value).toMatchObject({ status, code, message })
  })

  it('returns user when authorized', async () => {
    const { data, error, response } = await api.auth.login.get({
      headers: {
        Authorization: DEFAULT_BEARER_TMA_TOKEN,
      },
    })

    expect(response.status).toBe(200)
    expect(error).toBeNull()

    expect(data).toHaveProperty('telegramId')
    expect(data).toHaveProperty('firstName')
  })
})
