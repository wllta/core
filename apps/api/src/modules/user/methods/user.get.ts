import type { TMAUserZod } from '@wallet-analytic/shared'
import type { DBUser } from '@wallet-analytic/db'

import { db } from '@wallet-analytic/db'

export const getUserByTelegramId = async (
  tmaUser: TMAUserZod,
): Promise<DBUser> => {
  return db.user.getOrCreateByTelegramId(tmaUser)
}
