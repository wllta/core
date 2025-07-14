
FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY package.json bun.lock ./
COPY packages ./packages

COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/

RUN bun install

COPY . .

WORKDIR /app/apps/web

CMD ["bun", "run", "dev"]
