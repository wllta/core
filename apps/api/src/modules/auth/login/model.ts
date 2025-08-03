import { Elysia /** type Static */ } from 'elysia'

import { DBUserModel } from '../../user'

export const LoginModels = new Elysia().model({
  'db.user': DBUserModel,
})

// export type TMAUser = Static<typeof TMAUserModel>
