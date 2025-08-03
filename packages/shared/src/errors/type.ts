// import type { TSchema } from '@sinclair/typebox'
// import type { ValueErrorIterator } from '@sinclair/typebox/compiler'

export interface ErrorResponse {
  status: number
  code: string
  message: string
  details?: unknown
}

// export interface ValidationErrorDetail {
//   path: string
//   message: string
//   summary: string
// }
//
// export interface ValidationErrorResponse extends ErrorResponse {
//   error: {
//     status: 422
//     code: 'VALIDATION_ERROR'
//     message: string
//     errors: ValidationErrorDetail[]
//   }
// }

// export interface ValidationErrorItem {
//   summary: string
//   type: import('@sinclair/typebox/value').ValueErrorType
//   schema: TSchema
//   path: string
//   value: unknown
//   message: string
//   // errors: ValueErrorIterator[]
//   errors: Array<{
//     path: string
//     message: string
//     summary: string
//     errors: any[]
//   }>
// }

// export interface ValidationErrorResponse extends ErrorResponse {
//   error: {
//     status: 422
//     code: 'VALIDATION_ERROR'
//     message: string
//     errors: Array<ValidationErrorItem>
//   }
// }
