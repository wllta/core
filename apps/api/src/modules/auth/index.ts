import { Elysia } from 'elysia'

import { loginModule } from './login'

export const authModule = new Elysia({ prefix: 'auth' }).use(loginModule)
