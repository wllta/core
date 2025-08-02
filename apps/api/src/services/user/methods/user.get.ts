import type { TMAUser } from '@wallet-analytic/shared'
import type { DBUser } from '@wallet-analytic/db'

import { db } from '@wallet-analytic/db'

export const getUserByTelegramId = async (
  tmaUser: TMAUser,
): Promise<DBUser> => {
  return db.user.getOrCreateByTelegramId(tmaUser)
}
