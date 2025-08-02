# Wallet Analytic

## Development

### Docker

#### 🔧 Run Containers

Start and build containers from scratch (removing volumes and local images):

```bash
docker compose -f docker-compose.dev.yml down --rmi local --volumes && \
docker compose -f docker-compose.dev.yml up --build
```

Start containers in detached mode:
```bash
docker compose -f docker-compose.dev.yml up -d
```

Stop and remove containers and volumes:

```bash
docker compose -f docker-compose.dev.yml down -v
```

#### 📋 Logs & Status

View container logs:

```bash
docker compose -f docker-compose.dev.yml logs -f
```

#### View running containers:

```bash
docker compose -f docker-compose.dev.yml ps
```

#### 🔍 Check API Container Health
Inspect the health status of the wallet-analytic-wa-api container:

```bash
docker inspect wallet-analytic-wa-api-1 --format='{{json .State.Health}}'
```

##### 🧱 Rebuild a Specific Service (No Cache)

Rebuild the wa-api service without using the cache:

```bash
docker compose -f docker-compose.dev.yml build --no-cache wa-api
```
