# AI-C23 — Deploy de la Librería

Parte de la Librería de la Clase 21 (testing) y la deja lista para producción:
DB en **Neon**, backend en **Render** (Docker) y frontend como **Static Site** en Render.
Orden de la guía: Neon → back → front → CORS → seed.

## URLs

- Frontend: _(se completa al terminar el deploy)_
- API: _(se completa al terminar el deploy)_

## Qué cambió respecto de C21

### Backend

- **`Dockerfile.prod`** (nuevo): imagen de producción en dos etapas. La primera
  instala todo, genera el cliente de Prisma y compila TS a `dist/`; la segunda
  sólo copia `node_modules`, `dist` y `prisma/`. Al arrancar corre
  `prisma migrate deploy` y después `node dist/index.js`: si la migración falla,
  el deploy falla y Render sigue con la versión anterior.
- **`tsconfig.build.json`** (nuevo): extiende el `tsconfig.json`, compila sólo
  `src/` a `dist/` y deja afuera los `*.test.ts`.
- **`package.json`**: `build` (`tsc -p tsconfig.build.json`) y `start`
  (`node dist/index.js`, ya no `tsx`). `dev` y `test` siguen igual.
- El `Dockerfile` de desarrollo y el `docker-compose.yml` no cambian.

### Frontend

- Sin cambios de código: `VITE_API_URL` se define en Render como variable de
  entorno **de build** (Vite la incrusta al compilar).

## Configuración en Render / Neon

**Neon**: proyecto con una DB Postgres; se usa el connection string con
`sslmode=require`.

**Backend** (Web Service, Docker):

| Campo | Valor |
|---|---|
| Repo | `lluqlu/ds2026-actividades`, branch `main` |
| Root Directory | `ejercicios/c23-deploy/backend` |
| Dockerfile Path | `./Dockerfile.prod` |
| Variables | `DATABASE_URL` (Neon), `JWT_SECRET` (largo y aleatorio), `FRONTEND_URL` (URL del front, sin `/` final), `NODE_ENV=production` |

**Frontend** (Static Site):

| Campo | Valor |
|---|---|
| Root Directory | `ejercicios/c23-deploy/frontend` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |
| Variables | `VITE_API_URL` = URL de la API + `/api` |
| Rewrite | `/*` → `/index.html` (para que React Router resuelva las rutas al recargar) |

**Seed** (una vez, desde la PC, contra Neon):

```bash
cd backend
DATABASE_URL="<connection string de Neon>" npx prisma db seed
```

Usuarios del seed: `admin@libreria.test` / `Admin1234` y `cliente@libreria.test` / `Cliente1234`.
