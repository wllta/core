import type { TMAUserZod } from '@wallet-analytic/shared'
import type { DBUser } from '@wallet-analytic/db'

import { db } from '@wallet-analytic/db'
import { record } from '@elysiajs/opentelemetry'

export const getUserByTelegramId = async (
  tmaUser: TMAUserZod,
): Promise<DBUser> => {
  return record('user.get', () => db.user.getOrCreateByTelegramId(tmaUser))
}
