import { Elysia } from 'elysia'
import { treaty } from '@elysiajs/eden'

import { dbInstance } from '@wallet-analytic/db'

import { corsPlugin, openTelemetryPlugin, swaggerPlugin } from './plugins'
import { baseErrorHandler, handleValidationError } from './errorHandler'

import { loggerPlugin } from '@config/logger'
import { env } from '@config/env'

import { authModule } from '@modules/auth'
import { healthModule } from '@modules/health'

async function main() {
  try {
    await dbInstance.connect()
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

await main()

export const app = new Elysia()
  .use(loggerPlugin)
  .use(openTelemetryPlugin)
  .use(corsPlugin)
  .use(swaggerPlugin)
  .onError(({ error, code }) => {
    if (code === 'VALIDATION') {
      return handleValidationError(error)
    }

    return baseErrorHandler(error, code)
  })
  .use(authModule)
  .use(healthModule)
  .listen({
    port: env.NODE_ENV === 'test' ? 8001 : env.APP_PORT,
    // tls: {
    //   key: Bun.file("./key.pem"),
    //   cert: Bun.file("./cert.pem"),
    // }
  })

export const api = treaty(app)

console.log(`🦊 Server running at ${app.server?.url}`)
export type App = typeof app
