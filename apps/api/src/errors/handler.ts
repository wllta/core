import { record } from '@elysiajs/opentelemetry'

import type { HTTPHeaders, StatusMap } from 'elysia'
import type { ElysiaCookie } from 'elysia/cookies'

import { ApiError, type ErrorResponse } from '@wallet-analytic/shared'

interface Params {
  error: unknown
  set: {
    headers: HTTPHeaders
    status?: number | keyof StatusMap
    redirect?: string
    cookie?: Record<string, ElysiaCookie>
  }
}

export const errorHandler = ({ error, set }: Params): ErrorResponse => {
  const isDev = process.env.NODE_ENV === 'development'
  let apiError: ApiError

  console.log('error', error)

  if (error instanceof ApiError) {
    apiError = error
  } else if (error instanceof Error) {
    apiError = new ApiError(500, 'UNKNOWN_ERROR', error.message)
  } else {
    apiError = new ApiError(500, 'INTERNAL_ERROR', 'Internal Server Error')
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

  set.status = apiError.status

  return {
    error: {
      status: apiError.status,
      code: apiError.code,
      message: apiError.message,
      ...(apiError.details ? { details: apiError.details } : {}),
      ...(isDev && apiError.stack ? { stack: apiError.stack } : {}),
    },
  }
}
