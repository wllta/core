FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lock .

COPY apps/web/package.json ./apps/web/package.json

COPY packages/shared/package.json ./packages/shared/package.json

RUN bun install

COPY . .

WORKDIR /app/apps/web

CMD ["bun", "run", "dev"]