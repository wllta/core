import type { TMAUserZod } from '../../types'

export const generateTMAToken = (userData: TMAUserZod) => {
  const authDate = Math.floor(Date.now() / 1000)

  const telegramUserData = {
    id: userData.id,
    first_name: userData.firstName,
    last_name: userData.lastName ?? undefined,
    username: userData.username ?? undefined,
    language_code: userData.languageCode ?? undefined,
    photo_url: userData.photoUrl ?? undefined,
    is_premium: userData.isPremium ?? undefined,
    is_bot: userData.isBot ?? undefined,
    allows_write_to_pm: userData.allowsWriteToPm ?? undefined,
    added_to_attachment_menu: userData.addedToAttachmentMenu ?? undefined,
  }

  const filteredUserData = Object.fromEntries(
    Object.entries(telegramUserData).filter(([_, v]) => v !== undefined),
  )

  const userString = JSON.stringify(filteredUserData)
  const encodedUser = encodeURIComponent(userString)

  const params = new URLSearchParams()
  params.append('auth_date', authDate.toString())
  params.append('hash', 'some-hash')
  params.append('signature', 'some-signature')
  params.append('user', userString)

  return `Bearer tma ${params.toString().replace(/user=([^&]+)/, `user=${encodedUser}`)}`
}
