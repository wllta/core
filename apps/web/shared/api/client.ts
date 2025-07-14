import { treaty } from '@elysiajs/eden'

import type { App } from '@wallet-analytic/api'

export const client = treaty<App>('http://localhost:3001', {
  headers: {
    Authorization: 'Bearer asd',
  },
})
