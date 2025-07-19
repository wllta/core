import winston from 'winston'
import { Elysia } from 'elysia'

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
}

winston.addColors(colors)

export const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      let msg = `${timestamp} [${level}]: ${message}`

      if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`
      }

      return msg
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
})

export const loggerPlugin = new Elysia().decorate('logger', logger)
