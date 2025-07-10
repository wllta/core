FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y curl

FROM base AS deps
COPY package.json bun.lock ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/db/package.json ./packages/db/
COPY packages/ton-client/package.json ./packages/ton-client/
COPY apps/api/package.json ./apps/api/

RUN bun install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY packages/shared ./packages/shared
COPY packages/db ./packages/db
COPY packages/ton-client ./packages/ton-client
COPY apps/api ./apps/api

FROM base AS prod
ENV NODE_ENV=production
COPY --from=builder /app .
WORKDIR /app/apps/api
CMD ["bun", "run", "dev"]