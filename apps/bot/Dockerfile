FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lock .

COPY apps/bot/package.json ./apps/bot/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/db/package.json ./packages/db/package.json

COPY packages/shared ./packages/shared
COPY packages/db ./packages/db

COPY apps/bot ./apps/bot

RUN bun install

WORKDIR /app/apps/bot

CMD ["bun", "run", "dev"]
