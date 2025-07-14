import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

export const swaggerPlugin = new Elysia({ name: 'wa-swagger' }).use(swagger())
