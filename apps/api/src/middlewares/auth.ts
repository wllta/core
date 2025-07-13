import { Elysia } from 'elysia'
import bearer from '@elysiajs/bearer'

import { UnauthorizedError } from '../errors/internal'

export const AuthPlugin = new Elysia()
  .use(bearer())
  .derive({ as: 'scoped' }, async ({ bearer }) => {
    if (!bearer) throw new UnauthorizedError()

    return {
      Auth: {
        user: await getUser(bearer),
      },
    }
  })

const getUser = async (token: string) => {
  return { id: 1, name: 'asd' }
}
