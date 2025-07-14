import { record } from '@elysiajs/opentelemetry'

import { ApiError, type ErrorResponse } from '@wallet-analytic/shared'

export const errorHandler = ({ error }: { error: unknown }): ErrorResponse => {
  const isDev = process.env.NODE_ENV === 'development'
  let apiError: ApiError

  if (error instanceof ApiError) {
    apiError = error
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
