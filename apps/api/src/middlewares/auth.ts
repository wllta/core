import { parse, validate } from '@telegram-apps/init-data-node'

import bearer from '@elysiajs/bearer'
import { Elysia } from 'elysia'

import { TMAUserZodSchema, UnauthorizedError } from '@wallet-analytic/shared'

import { env } from '../config/env'
import { logger } from '../config/logger'
import { AuthType } from '../constants'

import { getUserByTelegramId } from '../modules/user'

export const AuthPlugin = new Elysia()
  .use(bearer())
  .derive({ as: 'scoped' }, async ({ bearer }) => {
    if (!bearer) {
      throw new UnauthorizedError('Auth token not found')
    }

    // https://docs.telegram-mini-apps.com/platform/authorizing-user
    const [authType, authData = ''] = bearer.split(' ')

    switch (authType) {
      case AuthType.TMA:
        const decodedAuthData = decodeURIComponent(authData)

        try {
          if (!env.IS_DEV) {
            validate(decodedAuthData, env.BOT_TOKEN, {
              // We consider init data sign valid for 1 hour from their creation moment.
              expiresIn: 3600,
            })
          }

          const user = parse(decodedAuthData, true).user
          if (!user?.id) {
            throw new UnauthorizedError('Invalid models data (id)')
          }

          const parsedUser = TMAUserZodSchema.safeParse(user)
          if (!parsedUser.success) {
            throw new UnauthorizedError('Invalid models data')
          }

          return {
            user: await getUserByTelegramId(parsedUser.data),
          }
        } catch (error) {
          logger.error(error)
          throw new UnauthorizedError('Unknown login error')
        }
      default:
        logger.error('Unknown login type', authType)
        throw new UnauthorizedError('Unknown login error')
    }
  })
