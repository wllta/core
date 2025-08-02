import { t } from 'elysia'

export const TMAUserModel = t.Object({
  addedToAttachmentMenu: t.Optional(t.Boolean()),
  allowsWriteToPm: t.Optional(t.Boolean()),
  isPremium: t.Optional(t.Boolean()),
  firstName: t.String(),
  id: t.Number(),
  isBot: t.Optional(t.Boolean()),
  lastName: t.Optional(t.String()),
  languageCode: t.Optional(t.String()),
  photoUrl: t.Optional(t.String()),
  username: t.Optional(t.String()),
})
