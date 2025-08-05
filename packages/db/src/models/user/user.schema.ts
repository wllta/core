import {
  bigint,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-typebox'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),

  telegramId: bigint('telegram_id', { mode: 'number' }).notNull().unique(),

  addedToAttachmentMenu: boolean('added_to_attachment_menu'),
  allowsWriteToPm: boolean('allows_write_to_pm'),
  isPremium: boolean('is_premium'),
  isBot: boolean('is_bot'),

  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }),
  username: varchar('username', { length: 128 }),
  languageCode: varchar('language_code', { length: 16 }),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

export const DBUserSelectModel = createSelectSchema(users)
export type DBUserSelectModel = typeof DBUserSelectModel.static

export const DBUserUpdateModel = createUpdateSchema(users)
export type DBUserUpdateModel = typeof DBUserUpdateModel.static

export const DBUserInsertModel = createInsertSchema(users)
export type DBUserInsertModel = typeof DBUserUpdateModel.static
