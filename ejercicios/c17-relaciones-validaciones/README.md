# AI-C17 — Relaciones y validaciones en la Librería

## Qué cambió respecto de C16

### Relaciones
- **Autor 1:N Libro**: el libro deja de guardar el autor como texto y pasa a
  tener `autorId` con FK a `Autor`.
- **Libro N:M Categoria**: tabla de unión implícita de Prisma.
- Migración commiteada: `prisma/migrations/*_relaciones/`.
- `seed.ts` reescrito: autores y categorías primero, después los libros con
  `connect` (por `nombre`), sin id a mano.
- `include` en los services, tipados con `Prisma.…GetPayload`:
  - `GET /api/libros` → cada libro con su **autor**
  - `GET /api/libros/:id` → autor **y** categorías
  - `GET /api/autores` / `:id` → con sus **libros**

### Validaciones
- `src/validations/`: `libroCreateSchema` / `libroUpdateSchema` (`.partial()`),
  `autorCreateSchema` / `autorUpdateSchema`, y `idParamSchema` para los `:id`.
- `src/middlewares/`:
  - `validate` / `validateParams`: parsean con Zod y, si falla, mandan el error a `next()`.
  - `errorHandler`: único lugar que traduce a status code —
    `ZodError → 400`, `P2002 → 409`, `P2025 → 404`, `P2003 → 409`.
- **Cero try/catch en los controllers**: Express 5 reenvía las promesas
  rechazadas al `errorHandler`.

## Casos de error en `api.http`

| Caso | Status |
| --- | --- |
| `:id` no numérico / body inválido | 400 |
| recurso inexistente | 404 |
| `nombre` de autor repetido (P2002) | 409 |
| libro con `autorId` inexistente (P2003) | 409 |

## Cómo correr

```bash
cp backend/.env.example backend/.env
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx tsx prisma/seed.ts
# probar backend/api.http con REST Client
```
