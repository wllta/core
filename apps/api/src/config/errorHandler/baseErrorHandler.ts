import { NotFoundError } from 'elysia'
import { record } from '@elysiajs/opentelemetry'

import {
  type ErrorResponse,
  ApiError,
  InternalServerError,
} from '@wallet-analytic/shared'

import { logger } from '../logger'

type ErrorCode =
  | number
  | 'UNKNOWN'
  | 'NOT_FOUND'
  | 'PARSE'
  | 'INTERNAL_SERVER_ERROR'
  | 'INVALID_COOKIE_SIGNATURE'
  | 'INVALID_FILE_TYPE'

export const baseErrorHandler = (
  error: unknown,
  code: ErrorCode,
): ErrorResponse => {
  const isDev = process.env.NODE_ENV === 'development'
  let apiError: ApiError
  console.log('code', code)

  // todo: add better type check and handler

  if (code === 'NOT_FOUND') {
    apiError = new NotFoundError()
  } else if (error instanceof ApiError) {
    apiError = error
  } else {
    apiError = new InternalServerError()
  }

  record('error.handler', (span) => {
    span.setAttributes({
      'error.status': apiError.status,
      'error.code': apiError.code,
      'error.message': apiError.message,
    })

    if (apiError.details) {
      span.setAttribute('error.details', JSON.stringify(apiError.details))
    }
  })

  logger.error(apiError)

  return {
    status: apiError.status,
    code: apiError.code,
    message: apiError.message,
    ...(apiError.details ? { details: apiError.details } : {}),
    ...(isDev && apiError.stack ? { stack: apiError.stack } : {}),
  }
}
