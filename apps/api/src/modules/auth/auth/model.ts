import { Elysia /** type Static */ } from 'elysia'

import { DBUserModel, TMAUserModel } from '@services/user'

export const LoginModels = new Elysia().model({
  'tma.user': TMAUserModel,
  'db.user': DBUserModel,
})

// export type TMAUser = Static<typeof TMAUserModel>
