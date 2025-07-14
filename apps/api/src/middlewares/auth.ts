import bearer from '@elysiajs/bearer'
import { Elysia } from 'elysia'

import { UnauthorizedError } from '@wallet-analytic/shared'

export const AuthPlugin = new Elysia()
  .use(bearer())
  .derive({ as: 'scoped' }, async ({ bearer }) => {
    if (!bearer) {
      throw new UnauthorizedError()
    }

    return {
      user: await getUser(bearer),
    }
  })

const getUser = async (_token: string) => {
  return { id: 1, name: 'asd' }
}
