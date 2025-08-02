import { eq } from 'drizzle-orm'

import { type DBUser, users } from '../../models'
import type { UserRepository } from './index'

type UserIdentifier =
  | { type: 'id'; value: DBUser['id'] }
  | { type: 'telegramId'; value: DBUser['telegramId'] }

export async function getById(
  this: UserRepository,
  { type, value }: UserIdentifier,
) {
  const result = await this.db
    .select()
    .from(users)
    .where((aliases) =>
      type === 'id' ? eq(aliases.id, value) : eq(aliases.telegramId, value),
    )
    .limit(1)

  return result[0] ?? null
}
