# AI-C13 — Docker + entorno de backend

Se arma el entorno básico del backend con Docker: el `api` (Express) y la `db`
(PostgreSQL) levantan juntos con `docker compose up`. Todavía no hay endpoints
propios ni Prisma — sólo el "hello" del servidor. Eso llega en C14 y C16.

## Estructura (nueva a partir de esta clase)

```
c13-docker/
├── frontend/            # la librería React (igual que en C11)
├── backend/
│   ├── src/index.ts     # servidor Express con el endpoint "/"
│   ├── Dockerfile       # imagen node:22-alpine
│   ├── .env.example     # el .env real está gitignoreado
│   └── package.json
└── docker-compose.yml   # api + db (postgres:16-alpine, volumen pgdata)
```

## Correr

```bash
cp backend/.env.example backend/.env
docker compose up --build
# api en http://localhost:3000  ·  db en localhost:5432
docker compose ps          # los dos contenedores arriba
docker compose logs -f api # logs del backend
docker compose down        # baja todo (los datos quedan en el volumen)
```

## Encuesta de cierre del Bloque 2

Además del entorno, la actividad pide completar la encuesta de satisfacción del
Bloque 2 (anónima).
