import { Elysia } from 'elysia'

import { DBUserSelectModel } from '@wallet-analytic/db'

export const LoginModels = new Elysia().model({
  'db.user': DBUserSelectModel,
})
