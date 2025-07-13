import { record } from '@elysiajs/opentelemetry'

import type { ErrorResponse } from './type'
import { ApiError } from './errors'

interface Params {
  error: unknown
  set: any
}

export const errorHandler = ({ error, set }: Params): ErrorResponse => {
  const isDev = process.env.NODE_ENV === 'development'
  let apiError: ApiError

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
