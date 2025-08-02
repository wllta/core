import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import type { users } from './user.schema'

export type DBUser = InferSelectModel<typeof users>
export type NewDBUser = InferInsertModel<typeof users>
