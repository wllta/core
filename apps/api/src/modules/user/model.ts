import { Elysia, t } from 'elysia'

export const UserModel = new Elysia().model({
  'user.getUserResponse': t.Object({
    id: t.Number(),
    name: t.String(),
  }),
})
