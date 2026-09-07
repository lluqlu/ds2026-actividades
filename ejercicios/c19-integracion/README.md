# AI-C19 — Integración Front ↔ Back en la Librería

El front deja de usar datos en memoria y habla con la API real: CORS, variables
de entorno de los dos lados, una sola puerta de salida (`apiFetch`), pantalla de
login y un alta que manda el token.

## Qué cambió respecto de C18

### Backend

- **`src/index.ts`**: `app.use(cors({ origin: [FRONTEND_URL] }))` **antes** de
  `express.json()` y de las rutas. Origen como lista (nunca `"*"`), leído de
  `FRONTEND_URL`. Sin `credentials` (el token va en el header, no en cookie).
- **`src/index.ts`**: middleware **404 en JSON** después de las rutas y antes del
  `errorHandler` (una ruta inexistente devolvía el HTML por defecto de Express y
  el front reventaba en `res.json()`).
- **`src/services/libro.services.ts`**: `create` y `update` ahora devuelven el
  libro con `include: { autor: true }`, igual que `findAll`/`findById`. El
  contrato es consistente: la misma forma haga GET o POST.
- **`package.json`**: `cors` + `@types/cors`.
- `backend/.env.example` ya traía `FRONTEND_URL=http://localhost:5173`.

### Frontend

- **`.env`** (fuera de Git) + **`.env.example`** (dentro) con
  `VITE_API_URL=http://localhost:3000/api`. Sólo las `VITE_*` llegan al código.
- **`src/vite-env.d.ts`**: `ImportMetaEnv` tipado (tipa lo declarado, no detecta el typo).
- **`src/services/api.ts`**: `apiFetch<T>(ruta, opciones)` — arma la URL desde la
  env, manda `Authorization: Bearer` si hay token, y preserva el mensaje de error
  real del backend (`cuerpo?.error`).
- **`src/services/sesion.ts`**: `guardarToken` / `obtenerToken` / `borrarToken`
  (localStorage; el `AuthContext` queda para C20).
- **`src/hooks/useFetch.ts`**: ahora lee a través de `apiFetch`. Mismo contrato
  público (`{ data, loading, error }`).
- **`src/schemas/loginSchema.ts`** + **`src/pages/Login.tsx`**: form con
  react-hook-form + Zod (email válido + password no vacía — sin fortaleza),
  `POST /api/auth/login`, guarda el token y muestra el error real del back.
- **`src/types/libro.ts`**: alineado con el JSON real de Prisma. `autor` es un
  objeto anidado (`{ id, nombre, nacionalidad }`), el alta manda `autorId`,
  `categorias` sólo llega en el detalle. Se fue `genero` (no existe en la API).
- **`src/pages/Catalogo.tsx`** y **`LibroDetalle.tsx`**: leen de
  `GET /api/libros` y `GET /api/libros/:id`. Ya no reciben los datos por props.
- **`src/pages/LibroNuevo.tsx`**: `POST /api/libros` real vía `apiFetch` (el
  token lo agrega solo). El autor se elige de la lista real (`GET /api/autores`)
  y se manda como `autorId`. Muestra el error del back.
- **`src/App.tsx`**: se fue el estado en memoria; cada página pide sus datos.
  Nueva ruta `/login`.
- **`src/components/Layout/Header.tsx`**: botón **Ingresar / Salir** según haya token.

## La matriz, ahora desde el navegador

| Situación | Status | En la UI |
| --- | --- | --- |
| Alta sin loguearse | 401 | "Falta el token" (mensaje del back) |
| Alta logueado como CLIENTE | 403 | "No tenés permiso…" |
| Alta logueado como ADMIN | 201 | Vuelve al catálogo con el libro nuevo |

Seed: `admin@libreria.test / Admin1234` · `cliente@libreria.test / Cliente1234`.
Con el header `Authorization` el navegador dispara el **preflight OPTIONS** (204)
antes del POST: en Network se ven dos requests.

## Cómo correr

```bash
# Backend
cp backend/.env.example backend/.env      # poné un JWT_SECRET real
docker compose up -d --build              # trae cors dentro de la imagen
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx tsx prisma/seed.ts

# Frontend
cp frontend/.env.example frontend/.env
cd frontend && npm install && npm run dev # http://localhost:5173
```

Comprobaciones: `npm run build` y `npm run lint` del front en verde; catálogo y
detalle traen datos de la API; login guarda el token; el alta responde 401/403/201
según el rol.
