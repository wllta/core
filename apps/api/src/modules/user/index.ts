import { Elysia } from 'elysia'

import { AuthPlugin } from '../../middlewares/auth'

import { userService } from './service'
import { UserModel } from './model'

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
