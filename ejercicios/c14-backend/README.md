# AI-C14 — Primer endpoint en la Librería

Fundamentos de backend: se abre la "caja" del `api` y se escribe el primer
endpoint propio. El sitio de la librería viene de la Clase 13 (`frontend/` +
`backend/` + `docker-compose.yml`); esta clase suma los endpoints al backend.

## Estructura

```
c14-backend/
├── frontend/            # la librería React (igual que en C10-C13)
├── backend/
│   ├── src/index.ts     # servidor + datos + endpoints, todo en un archivo (a propósito)
│   ├── Dockerfile
│   ├── api.http         # requests para probar con REST Client
│   └── .env.example
└── docker-compose.yml   # api + db, con volume de src/ para modo dev
```

## Endpoints

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/` | Hello de la API |
| GET | `/libros` | Lista todos los libros |
| GET | `/libros?disponible=true` | Filtra por disponibilidad (`true` / `false`) |
| GET | `/autores` | Lista los autores |

Los libros se sirven con la misma forma que el front ya consumía hardcodeada en
`App.tsx` (`id, titulo, autor, precio, genero, disponible, imagen`).

## Cómo correr

```bash
cp backend/.env.example backend/.env
docker compose up --build
# probar backend/api.http con REST Client, o:
curl http://localhost:3000/libros
```

El `volume` de `./backend/src` hace que `tsx watch` recargue solo al guardar,
sin `--build`. Si tocás `package.json` / `tsconfig` / `Dockerfile`, ahí sí:
`docker compose up --build`.
