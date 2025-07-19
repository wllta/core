import { treaty } from '@elysiajs/eden'
import { retrieveRawInitData } from '@telegram-apps/sdk-vue'

import type { App } from '@wallet-analytic/api'
import { withCatch } from '@wallet-analytic/shared'

const [data] = withCatch(retrieveRawInitData)

console.log('data', data)

export const DEFAULT_WEB_AUTH =
  data ||
  'id=2&first_name=user&username=user&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FNwVMRizm8HHWwnj-1l4ihcAWpKG9acSpX7ef57CRx8k.jpg'

export const client = treaty<App>('http://localhost:3001', {
  headers: {
    Authorization: `Bearer tma ${DEFAULT_WEB_AUTH}`,
  },
})
