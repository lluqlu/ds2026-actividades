# AI-C21 — Testing en la Librería

Parte de la Librería de la Clase 20 (autorización) y le suma Vitest en los dos
lados: tests unitarios, con mocks, de integración con supertest y de componente
con Testing Library.

## Qué cambió respecto de C20

### Backend

- **`src/app.ts`** (nuevo): arma la app de Express (CORS, rutas, 404, errorHandler)
  y la **exporta sin escuchar**. **`src/index.ts`** queda en 3 líneas: importa
  `app` y hace `listen`. Así supertest usa la app sin levantar un puerto, y
  `npm run dev` en Docker sigue igual.
- **`vitest.config.mts`**: `JWT_SECRET` de test (nunca el real) y `DATABASE_URL`
  tomado del `.env` con el host `db` cambiado por `localhost` (los tests corren
  desde la PC con el contenedor `db` levantado).
- **`package.json`**: scripts `test` (`vitest run`) y `test:watch` (`vitest`);
  devDependencies `vitest`, `supertest`, `@types/supertest`.
- Tests:
  - `validations/libro.validation.test.ts` — **unitario puro** del schema Zod.
  - `middlewares/auth.middleware.test.ts` — `authorize` y `authenticate` con
    `req`/`res`/`next` armados con **`vi.fn()`** (403, next, token válido, vencido).
  - `routes/libro.routes.test.ts` — **integración con supertest** sobre la matriz
    de permisos de `POST /api/libros`: sin token 401, CLIENTE 403, ADMIN con body
    inválido 400. No toca la DB (se corta antes del controller).
  - `routes/auth.routes.db.test.ts` — **necesita la DB** (aparte, con comentario):
    login con el usuario del seed y 401 genérico con un mail inexistente.

### Frontend

- **`vite.config.ts`**: bloque `test` con `environment: 'jsdom'` y `setupFiles`.
- **`src/setupTests.ts`**: matchers de jest-dom + `cleanup()` después de cada test.
- **`src/context/AuthContext.tsx`**: se exporta `AuthContext` para que el test
  inyecte un usuario sin pasar por la API.
- **`package.json`**: scripts `test` / `test:watch`; devDependencies `vitest`,
  `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- Tests:
  - `schemas/loginSchema.test.ts` — unitario del schema Zod del login.
  - `components/Layout/Header.test.tsx` — **componente con Testing Library**:
    qué ve cada rol (sin sesión, CLIENTE, ADMIN).

## Cómo correrlos

```bash
# backend: levantar la DB y cargar el seed (sólo para el test *.db.test.ts)
docker compose up -d db
cd backend
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/libreria_db npx prisma migrate deploy
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/libreria_db npx prisma db seed
npm test            # 11 tests
npx tsc --noEmit

# frontend
cd ../frontend
npm test            # 5 tests
npx tsc -p tsconfig.app.json --noEmit
```

## Verificado

- Backend: 4 archivos, **11 tests verdes**; `npx tsc --noEmit` limpio.
- Frontend: 2 archivos, **5 tests verdes**; `npx tsc -p tsconfig.app.json --noEmit` limpio.
- `docker compose up --build` + `npm run dev` en el container: `GET /` y
  `GET /api/libros` 200, login del admin OK con el `index.ts` → `app.ts` separado.
