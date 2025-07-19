import { parse, validate } from '@telegram-apps/init-data-node'
import bearer from '@elysiajs/bearer'
import { Elysia } from 'elysia'

import {
  type TMAUser,
  TMAUserSchema,
  UnauthorizedError,
} from '@wallet-analytic/shared'

import { env } from '../config/env'
import { logger } from '../config/logger'

export const AuthPlugin = new Elysia()
  .use(bearer())
  .derive({ as: 'scoped' }, async ({ bearer }) => {
    if (!bearer) {
      throw new UnauthorizedError('Auth token not found')
    }

    // https://docs.telegram-mini-apps.com/platform/authorizing-user
    const [authType, authData = ''] = bearer.split(' ')

    switch (authType) {
      case 'tma':
        // if (!IS_DEV) validate(sign, TG_BOT_TOKEN)
        //
        try {
          // validate(authData, env.BOT_TOKEN, {
          //   // We consider init data sign valid for 1 hour from their creation moment.
          //   // expiresIn: 3600,
          // })

          const user = parse(authData, true).user
          const parsedUser = TMAUserSchema.safeParse(user)
          if (!parsedUser.success) {
            throw new UnauthorizedError('Invalid user data')
          }

          console.log('data', user)

          if (!user?.id) {
            throw new UnauthorizedError('Invalid user data (id)')
          }

          return {
            user: await getUser(parsedUser.data),
          }
        } catch (error) {
          logger.error(error)
          throw new UnauthorizedError('Unknown auth error')
        }
      default:
        throw new UnauthorizedError('Unknown auth error')
    }
  })

const getUser = async (user: TMAUser) => {
  return user
}
