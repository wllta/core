import { Elysia, t } from 'elysia'

import { ValidationErrorModel } from './validation'

export const ErrorModel = new Elysia().model({
  'error.unauthorized': t.Object({
    status: t.Literal(401),
    code: t.Literal('UNAUTHORIZED'),
    message: t.String(),
    details: t.Optional(t.Unknown()),
  }),

  'error.forbidden': t.Object({
    status: t.Literal(403),
    code: t.Literal('FORBIDDEN'),
    message: t.String(),
    details: t.Optional(t.Unknown()),
  }),

  'error.notFound': t.Object({
    status: t.Literal(404),
    code: t.Literal('NOT_FOUND'),
    message: t.String(),
    details: t.Optional(t.Unknown()),
  }),

  'error.validation': ValidationErrorModel,

  'error.internal': t.Object({
    status: t.Literal(500),
    code: t.Literal('INTERNAL_ERROR'),
    message: t.String(),
    details: t.Optional(t.Unknown()),
  }),
})
