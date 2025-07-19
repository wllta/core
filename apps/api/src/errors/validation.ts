import { type Static, t } from 'elysia'

export const ValidationErrorDetailModel = t.Object({
  path: t.String(),
  message: t.String(),
  summary: t.String(),
  // TODO: specify this type if possible (sub-errors)
  errors: t.Array(t.Any()),
})

export const ValidationErrorModel = t.Object({
  status: t.Literal(422),
  code: t.Literal('VALIDATION_ERROR'),
  message: t.String(),
  errors: t.Array(ValidationErrorDetailModel),
})

export type ValidationErrorResponse = Static<typeof ValidationErrorModel>
