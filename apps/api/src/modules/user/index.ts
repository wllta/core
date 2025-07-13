import { Elysia } from 'elysia'

import { ForbiddenError } from '@wallet-analytic/shared'

import { AuthPlugin } from '../../middlewares/auth'

import { UserModel } from './model'
import { userService } from './service'

export const userModule = new Elysia({ prefix: '/user' })
  .use(AuthPlugin)
  .use(UserModel)
  .get(
    '/:id',
    async ({ params, Auth: { user } }) => {
      console.log('user', user)
      return userService.getUser(Number(params.id))
    },
    {
      response: 'user.getUserResponse',
    },
  )
  .get(
    '/all',
    async ({ Auth: { user } }) => {
      console.log('user', user)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      throw new ForbiddenError('Access denied')
      return userService.getUser(1)
    },
    {
      response: 'user.getUserResponse',
    },
  )
