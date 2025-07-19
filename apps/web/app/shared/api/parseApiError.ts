import { isApiError } from './isApiError'

export const parseApiError = (error: unknown) => {
  if (!isApiError(error)) {
    return 'Unknown error'
  }

  return error.value.error.message
}
