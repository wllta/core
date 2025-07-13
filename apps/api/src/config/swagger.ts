import { Elysia } from 'elysia'
import swagger from '@elysiajs/swagger'

export const swaggerPlugin = new Elysia().use(swagger())
