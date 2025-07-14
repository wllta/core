import { Elysia } from 'elysia'

import { corsPlugin, openTelemetryPlugin, swaggerPlugin } from './plugins'

import { loggerPlugin } from './config/logger'
import { env } from './config/env'
import { errorHandler } from './config/errorHandler'

import { userModule } from './modules/user'

const app = new Elysia()
  .use(loggerPlugin)
  .use(openTelemetryPlugin)
  .use(corsPlugin)
  .use(swaggerPlugin)
  .onError(errorHandler)
  .get('/health', 'Hello Elysia')
  .use(userModule)

app.listen(env.APP_PORT, () => {
  console.log(
    `🦊 Server running at ${app.server?.hostname}:${app.server?.port}`,
  )
})

export type App = typeof app
