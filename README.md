# Wallet analytic

## Development

### Docker

Clean and build the docker containers
```bash
docker compose -f docker-compose.dev.yml down --rmi local --volumes && \
docker compose -f docker-compose.dev.yml up --build
```

Get the status of the wallet-analytic-wa-api container
```bash
docker inspect wallet-analytic-wa-api-1 --format='{{json .State.Health}}'
```


```bash
docker compose -f docker-compose.dev.yml down -v && docker compose -f docker-compose.dev.yml up --build
```

```bash
docker compose -f docker-compose.dev.yml down
```

```bash
docker compose -f docker-compose.dev.yml up -d
```

```bash
docker compose -f docker-compose.dev.yml down -v
```

```bash
docker compose -f docker-compose.dev.yml logs -f
```

```bash
docker compose -f docker-compose.dev.yml ps
```

```bash
docker compose -f docker-compose.dev.db.yml up -d
```


```bash
docker-compose -f docker-compose.dev.yml build --no-cache wa-api
```
