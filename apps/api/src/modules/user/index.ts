import { Elysia } from 'elysia'

import { loggerPlugin } from '../../config/logger'
import { AuthPlugin } from '../../middlewares/auth'
import { ErrorModel } from '../../errors'

import { GetUserModel } from './model'
import { userService } from './service'

export const userModule = new Elysia({ prefix: '/user' })
  .use(loggerPlugin)
  .use(AuthPlugin)
  .use(GetUserModel)
  .use(ErrorModel)
  .get(
    '/:id',
    async ({ params, user }) => {
      console.log('user', user)
      return userService.getUser(Number(params.id))
    },
    {
      response: 'user.getUserResponse',
      detail: {
        tags: ['User'],
      },
    },
  )
  .get(
    '/all',
    async ({ user }) => {
      return userService.getUser(user.id)
    },
    {
      response: {
        200: 'user.getUserResponse',
        401: 'error.unauthorized',
        403: 'error.forbidden',
        500: 'error.internal',
      },
      detail: {
        tags: ['User'],
      },
    },
  )
