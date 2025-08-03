import { t } from 'elysia'

// This schema is used to validate the user data received from DB
// But it duplicates the DB schema from Drizzle
export const DBUserModel = t.Object(
  {
    id: t.String({ format: 'uuid' }),
    firstName: t.String(),
    telegramId: t.Number(),
    lastName: t.Nullable(t.String()),
    username: t.Nullable(t.String()),
    photoUrl: t.Nullable(t.String()),

    languageCode: t.Nullable(t.String()),
    allowsWriteToPm: t.Nullable(t.Boolean()),
    addedToAttachmentMenu: t.Nullable(t.Boolean()),

    isBot: t.Nullable(t.Boolean()),
    isPremium: t.Nullable(t.Boolean()),
    createdAt: t.Date({ default: new Date() }),
  },
  {
    description: 'User data from database',
  },
)

export type DBUserModel = typeof DBUserModel.static

// export const TMAUserModel = t.Object(
//   {
//     addedToAttachmentMenu: t.Optional(t.Boolean()),
//     allowsWriteToPm: t.Optional(t.Boolean()),
//     isPremium: t.Optional(t.Boolean()),
//     firstName: t.String(),
//     id: t.Number(),
//     isBot: t.Optional(t.Boolean()),
//     lastName: t.Optional(t.String()),
//     languageCode: t.Optional(t.String()),
//     photoUrl: t.Optional(t.String()),
//     username: t.Optional(t.String()),
//   },
//   {
//     description: 'User data that we receive from Telegram',
//   },
// )
//
// export type TMAUserModel = typeof TMAUserModel.static
