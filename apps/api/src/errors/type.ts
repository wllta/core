// 2. Формат ответа с ошибкой
export interface ErrorResponse {
  error: {
    status: number
    code: string
    message: string
    details?: unknown
    stack?: string // Только для development
  }
}
