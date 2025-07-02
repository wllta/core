FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lock .

COPY apps/api/package.json ./apps/api/package.json

COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/ton-client/package.json ./packages/ton-client/package.json
COPY packages/db/package.json ./packages/db/package.json

RUN bun install

COPY . .

WORKDIR /app/apps/api

CMD ["bun", "run", "dev"]