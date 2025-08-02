import { eq } from 'drizzle-orm'
import { NotFoundError, type TMAUser } from '@wallet-analytic/shared'

import { type DBUser, users } from '../../models'

import type { UserRepository } from './index'

export async function getOrCreateByTelegramId(
  this: UserRepository,
  tmaUser: TMAUser,
): Promise<DBUser> {
  const [user] = await this.db
    .insert(users)
    .values({
      id: Bun.randomUUIDv7(),
      telegramId: tmaUser.id,
      firstName: tmaUser.firstName,
      lastName: tmaUser.lastName ?? null,
      username: tmaUser.username ?? null,
      languageCode: tmaUser.languageCode ?? null,
      isBot: tmaUser.isBot ?? null,
      isPremium: tmaUser.isPremium ?? null,
      allowsWriteToPm: tmaUser.allowsWriteToPm ?? null,
      addedToAttachmentMenu: tmaUser.addedToAttachmentMenu ?? null,
      photoUrl: tmaUser.photoUrl ?? null,
    })
    .onConflictDoNothing()
    .returning()

  if (user) {
    return user
  }

  const [existingUser] = await this.db
    .select()
    .from(users)
    .where((user) => eq(user.telegramId, tmaUser.id))
    .limit(1)

  if (!existingUser) {
    throw new NotFoundError('User not found')
  }

  return existingUser
}
