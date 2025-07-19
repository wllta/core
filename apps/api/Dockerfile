FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y curl

FROM base AS dev

COPY package.json bun.lock ./

COPY packages ./packages
COPY apps/api ./apps/api

WORKDIR /app/apps/api

CMD ["bun", "run", "dev"]