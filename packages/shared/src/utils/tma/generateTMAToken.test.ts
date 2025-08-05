import { describe, expect, it } from 'bun:test'

import { generateTMAToken } from './generateTMAToken'
import type { TMAUserZod } from '../../types'

describe('generateTMAToken', () => {
  const baseUser: TMAUserZod = {
    id: 1,
    firstName: 'Test',
    lastName: undefined,
    username: undefined,
    languageCode: undefined,
    photoUrl: undefined,
    isPremium: undefined,
    isBot: undefined,
    allowsWriteToPm: undefined,
    addedToAttachmentMenu: undefined,
  }

  it('should generate valid token with minimal required fields', () => {
    const token = generateTMAToken({
      id: 1,
      firstName: 'TestUser',
    })

    expect(token).toStartWith('Bearer tma ')
    expect(token).toInclude('auth_date=')
    expect(token).toInclude('hash=some-hash')
    expect(token).toInclude('signature=some-signature')
    expect(token).toInclude(
      'user=%7B%22id%22%3A1%2C%22first_name%22%3A%22TestUser%22%7D',
    )
  })

  it('should include all provided fields in token', () => {
    const fullUser: TMAUserZod = {
      id: 123,
      firstName: 'Vladislav',
      lastName: 'Petrov',
      username: 'vladpetrov',
      languageCode: 'en',
      photoUrl: 'https://example.com/photo.jpg',
      isPremium: true,
      isBot: false,
      allowsWriteToPm: true,
      addedToAttachmentMenu: false,
    }

    const token = generateTMAToken(fullUser)
    const userPart = token.match(/user=([^&]+)/)?.[1]
    const decodedUser = JSON.parse(decodeURIComponent(userPart || ''))

    expect(decodedUser).toEqual({
      id: 123,
      first_name: 'Vladislav',
      last_name: 'Petrov',
      username: 'vladpetrov',
      language_code: 'en',
      photo_url: 'https://example.com/photo.jpg',
      is_premium: true,
      is_bot: false,
      allows_write_to_pm: true,
      added_to_attachment_menu: false,
    })
  })

  it('should exclude undefined fields from token', () => {
    const partialUser: TMAUserZod = {
      id: 456,
      firstName: 'Partial',
      isPremium: true,
      allowsWriteToPm: false,
    }

    const token = generateTMAToken(partialUser)
    const userPart = token.match(/user=([^&]+)/)?.[1]
    const decodedUser = JSON.parse(decodeURIComponent(userPart || ''))

    expect(decodedUser).toEqual({
      id: 456,
      first_name: 'Partial',
      is_premium: true,
      allows_write_to_pm: false,
    })
    expect(decodedUser).not.toHaveProperty('last_name')
    expect(decodedUser).not.toHaveProperty('photo_url')
  })

  it('should handle null values correctly', () => {
    const token = generateTMAToken({
      ...baseUser,
      lastName: null,
      isBot: null,
    })

    const userPart = token.match(/user=([^&]+)/)?.[1]
    const decodedUser = JSON.parse(decodeURIComponent(userPart || ''))

    expect(decodedUser).toEqual({
      id: 1,
      first_name: 'Test',
    })
    expect(decodedUser).not.toHaveProperty('last_name')
    expect(decodedUser).not.toHaveProperty('is_bot')
  })

  it('should preserve false boolean values', () => {
    const token = generateTMAToken({
      ...baseUser,
      isBot: false,
      isPremium: false,
    })

    const userPart = token.match(/user=([^&]+)/)?.[1]
    const decodedUser = JSON.parse(decodeURIComponent(userPart || ''))

    expect(decodedUser).toEqual({
      id: 1,
      first_name: 'Test',
      is_bot: false,
      is_premium: false,
    })
  })

  it('should correctly encode special characters', () => {
    const token = generateTMAToken({
      ...baseUser,
      firstName: 'Тест',
      lastName: 'Иванов-Петров',
      username: 'user@name',
    })

    expect(token).toInclude('first_name%22%3A%22%D0%A2%D0%B5%D1%81%D1%82%22')
    expect(token).toInclude(
      'last_name%22%3A%22%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2-%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2%22',
    )
    expect(token).toInclude('username%22%3A%22user%40name%22')
  })

  it('should include current timestamp in auth_date', () => {
    const before = Math.floor(Date.now() / 1000)
    const token = generateTMAToken(baseUser)
    const after = Math.floor(Date.now() / 1000)

    const authDate = parseInt(token.match(/auth_date=(\d+)/)?.[1] || '0')
    expect(authDate).toBeGreaterThanOrEqual(before)
    expect(authDate).toBeLessThanOrEqual(after)
  })

  it('should maintain the correct token format', () => {
    const token = generateTMAToken(baseUser)
    const pattern =
      /^Bearer tma auth_date=\d+&hash=some-hash&signature=some-signature&user=.+$/
    expect(token).toMatch(pattern)
  })
})
