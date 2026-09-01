# AI-C15 — Capas en la Librería

El backend de C14 tenía todo en `src/index.ts`. Acá se ordena en capas, con una
responsabilidad por archivo:

```
routes/       →  qué URL y qué verbo (rutas relativas)
controllers/  →  traduce HTTP <-> dominio y elige el status code
services/     →  la lógica y los datos (en memoria por ahora; C16 = Prisma)
types/        →  las interfaces del dominio
```

`index.ts` no tiene ni un dato ni un `if`: sólo levanta el server y monta los
dos routers.

## Estructura

```
c15-api-rest/
├── frontend/                    # la librería React (igual que en C10-C14)
├── backend/
│   ├── src/
│   │   ├── index.ts             # server + monta /api/libros y /api/autores
│   │   ├── routes/              # libro.routes.ts, autor.routes.ts
│   │   ├── controllers/        # libro.controller.ts, autor.controller.ts
│   │   ├── services/           # libro.services.ts, autor.services.ts
│   │   └── types/              # libro.types.ts, autor.types.ts
│   └── api.http
└── docker-compose.yml
```

## Endpoints

CRUD completo (5 endpoints) para cada recurso:

| Método | Ruta | Éxito | Error |
| --- | --- | --- | --- |
| GET | `/api/libros` · `?disponible=true\|false` | 200 | — |
| GET | `/api/libros/:id` | 200 | 404 |
| POST | `/api/libros` | 201 | — |
| PUT | `/api/libros/:id` | 200 | 404 |
| DELETE | `/api/libros/:id` | 204 | 404 |
| GET | `/api/autores` | 200 | — |
| GET | `/api/autores/:id` | 200 | 404 |
| POST | `/api/autores` | 201 | — |
| PUT | `/api/autores/:id` | 200 | 404 |
| DELETE | `/api/autores/:id` | 204 | 404 |

Todavía no hay validación del body (llega en C17 con Zod) ni relación entre
Libro y Autor (el libro guarda el nombre del autor como string).

## Cómo correr

```bash
cp backend/.env.example backend/.env
docker compose up --build
# probar backend/api.http con REST Client (incluye los casos 404), o:
curl http://localhost:3000/api/libros
```
