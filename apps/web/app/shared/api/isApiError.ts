import type { ApiErrorWrapper } from './types'

export const isApiError = (error: unknown): error is ApiErrorWrapper => {
  if (!error || typeof error !== 'object') {
    return false
  }

  if (!('value' in error) || typeof error.value !== 'object') {
    return false
  }

  const value = error.value as Record<string, unknown>
  if (!('error' in value)) {
    return false
  }

  const errorObj = value.error as Record<string, unknown>
  return (
    'status' in errorObj &&
    'code' in errorObj &&
    'message' in errorObj &&
    typeof errorObj.status === 'number' &&
    typeof errorObj.code === 'string' &&
    typeof errorObj.message === 'string'
  )
}
