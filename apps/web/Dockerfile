FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS deps

COPY bun.lock ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN bun install

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY apps/web ./apps/web
COPY packages ./packages

FROM base AS prod
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app .

WORKDIR /app/apps/web
CMD ["bun", "run", "dev"]
