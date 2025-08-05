import { eq } from 'drizzle-orm'

import { NotFoundError, type TMAUserZod } from '@wallet-analytic/shared'

import { type DBUser, users } from '../../models'
import type { UserRepository } from './index'

export async function getOrCreateByTelegramId(
  this: UserRepository,
  tmaUser: TMAUserZod,
): Promise<DBUser> {
  const [user] = await this.db
    .insert(users)
    .values({
      id: Bun.randomUUIDv7(),
      telegramId: tmaUser.id,
      firstName: tmaUser.firstName,
      lastName: tmaUser.lastName,
      username: tmaUser.username,
      languageCode: tmaUser.languageCode,
      isBot: tmaUser.isBot,
      isPremium: tmaUser.isPremium,
      allowsWriteToPm: tmaUser.allowsWriteToPm,
      addedToAttachmentMenu: tmaUser.addedToAttachmentMenu,
      photoUrl: tmaUser.photoUrl,
    })
    .onConflictDoUpdate({
      target: users.telegramId,
      set: {
        firstName: tmaUser.firstName,
        lastName: tmaUser.lastName,
        username: tmaUser.username,
        languageCode: tmaUser.languageCode,
        isBot: tmaUser.isBot,
        isPremium: tmaUser.isPremium,
        allowsWriteToPm: tmaUser.allowsWriteToPm,
        addedToAttachmentMenu: tmaUser.addedToAttachmentMenu,
        photoUrl: tmaUser.photoUrl,
        updatedAt: new Date(),
      },
    })
    .returning()

  if (!user) {
    const [existingUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.telegramId, tmaUser.id))
      .limit(1)

    if (!existingUser) {
      throw new NotFoundError('User not found')
    }
    return existingUser
  }

  return user
}
