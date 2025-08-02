import { db as dbInstance } from './database'

export * from './models'
// export * from './database'
// export * from './repositories'

import { DIContainer } from './di'

export const db = new DIContainer(() => dbInstance.db)
export { dbInstance }
