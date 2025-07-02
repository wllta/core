import { TelegramClient } from '@mtcute/bun'
import { Dispatcher, filters } from '@mtcute/dispatcher'

import * as env from './env'
import { tr } from './i18n'

const tg = new TelegramClient({
  apiId: env.API_ID,
  apiHash: env.API_HASH,
  storage: 'bot-data/session',
})

const dp = Dispatcher.for(tg)

dp.onNewMessage(filters.start, async (msg) => {
  await msg.answerText(tr(msg, 'helloWorld'))
})

const user = await tg.start({ botToken: env.BOT_TOKEN })
console.log('Logged in as', user.username)
