export interface ApiErrorResponse {
  error: {
    status: number
    code: string
    message: string
    stack?: string
    details?: unknown
  }
}

export interface ApiErrorWrapper {
  value: ApiErrorResponse
}

// export type ApiClientResponse<T = unknown> =
//   | { data: T; error?: never }
//   | { data?: never; error: ApiErrorWrapper }
