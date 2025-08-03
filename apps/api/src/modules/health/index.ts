import { Elysia } from 'elysia'

import { ErrorModel } from '../../errors'
import { HealthModel } from './model'

export const healthModule = new Elysia()
  .use(ErrorModel)
  .get('/health', () => ({ ts: Date.now() }), {
    response: {
      200: HealthModel,
      500: 'error.internal',
    },
    detail: {
      tags: ['Health'],
      description: 'Returns the current timestamp on server',
      externalDocs: {
        description: 'External docs',
        url: 'http://localhost/asd',
      },
    },
  })
