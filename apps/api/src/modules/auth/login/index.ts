import { Elysia } from 'elysia'

import { loggerPlugin } from '../../../config/logger'
import { AuthPlugin } from '../../../middlewares/auth'
import { ErrorModel } from '../../../errors'

import { LoginModels } from './model'

export const loginModule = new Elysia()
  .use(loggerPlugin)
  .use(AuthPlugin)
  .use(LoginModels)
  .use(ErrorModel)
  .get(
    '/login',
    async ({ user }) => {
      console.log('user', user)
      return user
    },
    {
      response: {
        200: 'db.user',
        401: 'error.unauthorized',
        422: 'error.validation',
        500: 'error.internal',
      },
      detail: {
        tags: ['Login'],
        description: 'Returns all needed data for user auth',
        externalDocs: {
          description: 'Telegram mini apps docs',
          url: 'https://docs.telegram-mini-apps.com/packages/telegram-apps-init-data-node/2-x',
        },
      },
    },
  )
