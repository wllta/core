# Wallet analytic

```bash
docker compose -f docker-compose.dev.yml down --rmi local --volumes && \
docker compose -f docker-compose.dev.yml up --build
```

docker inspect wallet-analytic-wa-api-1 --format='{{json .State.Health}}'

```bash
docker compose -f docker-compose.dev.yml down -v && docker compose -f docker-compose.dev.yml up --build
```