import { record } from '@elysiajs/opentelemetry'

import { ForbiddenError, NotFoundError } from '@wallet-analytic/shared'

export const userService = {
  async getUser(userId: number) {
    return record('userService.getUser', async () => {
      if (userId === 777) throw new ForbiddenError('Access denied')
      if (userId > 100) throw new NotFoundError('User not found')

      await record(
        'db.query',
        () => new Promise((resolve) => setTimeout(resolve, 50)),
      )

      return { id: userId, name: 'John Doe' }
    })
  },
}
