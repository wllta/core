import type { DbType } from './database'

import { UserRepository } from './repositories'

export class DIContainer {
  constructor(private readonly getDatabaseInstance: () => DbType) {}

  private get db(): DbType {
    return this.getDatabaseInstance()
  }

  private _user?: UserRepository

  get user() {
    return (this._user ??= new UserRepository(this.db))
  }
}
