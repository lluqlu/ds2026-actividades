# AI-C18 — Autenticación (JWT) en la Librería

Contraseñas hasheadas, identidad por token y endpoints que saben quién les habla.

## Qué cambió respecto de C17

- **`schema.prisma`**: `enum Rol { ADMIN CLIENTE }` + `model Usuario`
  (`email @unique`, `passwordHash`, `nombre`, `rol @default(CLIENTE)`).
- Migración commiteada: `prisma/migrations/*_usuarios_y_roles/`.
- **`seed.ts`**: un usuario por rol, contraseñas hasheadas con bcrypt, `upsert`
  (corre dos veces sin explotar):
  `admin@libreria.test / Admin1234` · `cliente@libreria.test / Cliente1234`.
- **`src/config/env.ts`**: `JWT_SECRET` (obligatorio, falla al arrancar si falta),
  `JWT_EXPIRES_IN`, `SALT_ROUNDS`.
- **`src/config/prisma.ts`**: `omit: { usuario: { passwordHash: true } }` — el hash
  no sale nunca por accidente (el login lo pide explícito).
- **`src/validations/auth.validation.ts`**: `registroSchema` (fortaleza de
  contraseña) y `loginSchema` (NO valida fortaleza).
- **`src/middlewares/auth.middleware.ts`**: `authenticate` (401) y `authorize(...roles)` (403).
- **`src/types/express.d.ts`**: `req.usuario`.
- **Rutas**: `POST /api/auth/registro`, `POST /api/auth/login`, `GET /api/auth/yo`.
  Escritura de libros y autores → `authenticate` + `authorize("ADMIN")`. Lectura pública.

## Los 12 casos (`api.http`)

| # | Request | Esperado |
| --- | --- | --- |
| 1 | POST /auth/registro | 201, sin `passwordHash` |
| 2 | POST /auth/registro (mismo email) | 409 |
| 3 | POST /auth/registro (datos inválidos) | 400 |
| 4 | POST /auth/login (mail inexistente) | 401 genérico |
| 5 | POST /auth/login (password mal) | 401, mismo mensaje |
| 6 | POST /auth/login (ok) | 200 con token |
| 7 | GET /auth/yo (sin header) | 401 |
| 8 | GET /auth/yo (token CLIENTE) | 200 |
| 9 | POST /api/libros (sin header) | 401 |
| 10 | POST /api/libros (token CLIENTE) | 403 |
| 11 | POST /api/libros (token ADMIN) | 201 |
| 12 | GET /api/libros (sin header) | 200 (público) |

## Cómo correr

```bash
cp backend/.env.example backend/.env   # y poné un JWT_SECRET real
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx tsx prisma/seed.ts
# probar backend/api.http con REST Client (el token se captura con @name)
```
