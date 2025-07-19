import { Elysia } from 'elysia'

import { loginModule } from './auth'

export const authModule = new Elysia({ prefix: 'auth' }).use(loginModule)
