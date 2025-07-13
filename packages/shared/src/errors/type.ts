export interface ErrorResponse {
  error: {
    status: number
    code: string
    message: string
    details?: unknown
  }
}
