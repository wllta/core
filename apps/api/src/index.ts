import { Elysia } from 'elysia'

import { errorHandler } from './errors/handler'

import { corsPlugin, openTelemetryPlugin, swaggerPlugin } from './config'

import { userModule } from './modules/user'

const app = new Elysia()
  .use(openTelemetryPlugin)
  .use(corsPlugin)
  .use(swaggerPlugin)
  .onError(({ set, error }) => errorHandler({ error, set }))
  .get('/health', () => 'Hello Elysia')
  .use(userModule)

app.listen(3001, () => {
  console.log(
    `🦊 Server running at ${app.server?.hostname}:${app.server?.port}`,
  )
})

export type App = typeof app
