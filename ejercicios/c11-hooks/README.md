# AI-C11 — Hooks en la Librería

Incorpora `useEffect` y un custom hook `useFetch` a la librería React de C10.
El catálogo deja de tener los libros hardcodeados en `App.tsx` y los pide a un
mock (`public/libros.json`).

## Qué cambió respecto de C10

- **`src/hooks/useFetch.ts`**: custom hook genérico `useFetch<T>(url)` que
  devuelve `{ data, loading, error }` — el patrón de 3 estados, una sola vez.
  Usa `useEffect` con `[url]` como dependencia.
- **`public/libros.json`**: el mock con los 6 libros (misma forma que el tipo `Libro`).
- **`src/pages/Catalogo.tsx`**: usa `useFetch<Libro[]>('/libros.json')`.
  - `<Spinner />` mientras `loading`
  - `<Alert variant="danger">` si `error`
  - `useEffect` directo para setear `document.title`
- **`src/pages/LibroDetalle.tsx`**: también lee del mock y busca por `id`.
- **`src/App.tsx`**: se reduce al mapa de rutas — ya no guarda estado ni pasa
  `libros` por props.
- **`src/pages/LibroNuevo.tsx`**: el formulario sigue validando con Zod, pero
  guardar de verdad necesita un backend (Bloque siguiente), así que por ahora
  sólo avisa.

## Correr

```bash
npm install
npm run dev
```
