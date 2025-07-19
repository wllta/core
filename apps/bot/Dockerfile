FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS dev

COPY package.json bun.lock ./

COPY packages ./packages
COPY apps/bot ./apps/bot

WORKDIR /app/apps/bot

CMD ["bun", "run", "dev"]
