# AI-C16 — Persistencia en la Librería

Los datos dejan de vivir en memoria: pasan a PostgreSQL con Prisma. Al reiniciar
el server, los libros y autores siguen ahí.

## Qué cambió respecto de C15

- **Prisma 7** (`@prisma/client` + `@prisma/adapter-pg` + `pg`), cliente generado en
  `src/generated/prisma`, configurado en `prisma.config.ts`.
- `prisma/schema.prisma` con `Libro` y `Autor` **sin relación** entre ellos
  (el libro guarda el nombre del autor como texto — la relación llega en C17).
- Una migración commiteada: `prisma/migrations/20260809153231_init/`.
- `prisma/seed.ts` con los datos de la librería, **sin id a mano**.
- `src/config/prisma.ts`: una única instancia de `PrismaClient` con el adapter `pg`.
- Los services de libro y autor ahora consultan la base (`prisma.libro.*`,
  `prisma.autor.*`) en vez de un array.
- `docker-compose.yml`: volúmenes de `prisma/` y `prisma.config.ts`, y
  **healthcheck** de `db` (`pg_isready`); la `api` espera a que la base esté sana.

## Endpoints

CRUD completo de `Libro` y `Autor` en `/api/libros` y `/api/autores`
(GET all · GET :id → 404 · POST → 201 · PUT → 404 · DELETE → 204/404).

## Cómo correr

```bash
cp backend/.env.example backend/.env
docker compose up -d --build
# aplicar la migración y sembrar (dentro del contenedor):
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx tsx prisma/seed.ts
# probar backend/api.http con REST Client
```

Para correr Prisma CLI desde la PC con sólo `docker compose up -d db`, poné
`localhost` en vez de `db` en el `DATABASE_URL` del `.env`.
