import { generateTMAToken } from '@wallet-analytic/shared'

export const DEFAULT_BEARER_TMA_TOKEN = generateTMAToken({
  id: 1,
  firstName: 'Vladislav',
  lastName: 'Bob',
  username: 'vladislavbob',
  isPremium: true,
  isBot: false,
})
