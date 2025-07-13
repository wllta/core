FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y curl

FROM base AS deps

COPY package.json bun.lock ./

COPY packages/*/package.json ./packages/
COPY apps/*/package.json ./apps/

RUN bun install

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM base AS prod

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web ./apps/web

WORKDIR /app/apps/web
CMD ["bun", "run", "dev"]