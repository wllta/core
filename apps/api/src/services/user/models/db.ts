import { t } from 'elysia'
// import { createInsertSchema } from 'drizzle-typebox'
// import { users } from '@wallet-analytic/db'

export const DBUserModel = t.Object({
  id: t.String({ format: 'uuid' }),
  telegramId: t.Number(),
  firstName: t.String(),

  isPremium: t.Nullable(t.Boolean()),
  isBot: t.Nullable(t.Boolean()),
  lastName: t.Nullable(t.String()),
  username: t.Nullable(t.String()),
  languageCode: t.Nullable(t.String()),
  photoUrl: t.Nullable(t.String()),

  allowsWriteToPm: t.Nullable(t.Boolean()),
  addedToAttachmentMenu: t.Nullable(t.Boolean()),
})

// export const DBUserModel = createInsertSchema(users)
