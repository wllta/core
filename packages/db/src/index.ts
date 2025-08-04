import { db as dbInstance } from './database'

export * from './models'

import { DBContainer } from './di'

export const db = new DBContainer(() => dbInstance.db)
export { dbInstance }
