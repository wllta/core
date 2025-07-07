FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS deps

COPY bun.lock ./
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/ton-client/package.json ./packages/ton-client/package.json
COPY packages/db/package.json ./packages/db/package.json

RUN bun install

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY apps/api ./apps/api
COPY packages ./packages

FROM base AS prod
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app .

WORKDIR /app/apps/api
CMD ["bun", "run", "dev"]
