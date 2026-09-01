import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// AI-C14: por ahora todo vive en este archivo (servidor + datos + endpoints).
// Con 2-3 endpoints alcanza; en C15 esto se ordena en rutas y capas, y en C16
// los datos hardcodeados pasan a PostgreSQL con Prisma.

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  genero: string;
  disponible: boolean;
  imagen: string;
}

interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

const IMG = "https://placehold.co/300x400?text=Libro";

// Mismos datos que el front ya mostraba hardcodeados en App.tsx, ahora servidos
// por la API con la misma forma que consume el useFetch.
const libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, genero: "Cuentos", disponible: true, imagen: IMG },
  { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, genero: "Novela", disponible: true, imagen: IMG },
  { id: 3, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, genero: "Cuentos", disponible: true, imagen: IMG },
  { id: 4, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 22000, genero: "Novela", disponible: false, imagen: IMG },
  { id: 5, titulo: "El túnel", autor: "Ernesto Sábato", precio: 12000, genero: "Novela", disponible: true, imagen: IMG },
  { id: 6, titulo: "Santa Evita", autor: "Tomás Eloy Martínez", precio: 16000, genero: "Novela", disponible: true, imagen: IMG },
];

const autores: Autor[] = [
  { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { id: 2, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { id: 3, nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { id: 4, nombre: "Ernesto Sábato", nacionalidad: "Argentina" },
  { id: 5, nombre: "Tomás Eloy Martínez", nacionalidad: "Argentina" },
];

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

// GET /libros y GET /libros?disponible=true|false
app.get("/libros", (req, res) => {
  const { disponible } = req.query;

  if (disponible === "true" || disponible === "false") {
    const soloDisponibles = disponible === "true";
    res.json(libros.filter((libro) => libro.disponible === soloDisponibles));
    return;
  }

  res.json(libros);
});

app.get("/autores", (_req, res) => {
  res.json(autores);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
