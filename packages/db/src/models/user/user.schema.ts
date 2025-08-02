import {
  bigint,
  boolean,
  pgTable,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

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
})
