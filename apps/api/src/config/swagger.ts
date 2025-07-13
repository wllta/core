import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

export const swaggerPlugin = new Elysia().use(swagger())
