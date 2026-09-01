import { Libro } from "../types/libro.types";

// Los datos viven acá, en memoria: se pierden al reiniciar el server.
// En C16 esto pasa a PostgreSQL con Prisma.
const IMG = "https://placehold.co/300x400?text=Libro";

const libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, genero: "Cuentos", disponible: true, imagen: IMG },
  { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, genero: "Novela", disponible: true, imagen: IMG },
  { id: 3, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, genero: "Cuentos", disponible: true, imagen: IMG },
  { id: 4, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 22000, genero: "Novela", disponible: false, imagen: IMG },
  { id: 5, titulo: "El túnel", autor: "Ernesto Sábato", precio: 12000, genero: "Novela", disponible: true, imagen: IMG },
  { id: 6, titulo: "Santa Evita", autor: "Tomás Eloy Martínez", precio: 16000, genero: "Novela", disponible: true, imagen: IMG },
];

let proximoId = 7;

// El service no sabe que existe HTTP: no ve req/res ni devuelve status codes.
// Si "disponible" viene undefined, devuelve todo.
export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter((libro) => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

// Omit<Libro, "id"> = un Libro sin id: el id lo pone el servidor, no el cliente.
export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const i = libros.findIndex((libro) => libro.id === id);
  if (i === -1) return undefined;
  libros[i] = { id, ...datos };
  return libros[i];
}

export function remove(id: number): boolean {
  const i = libros.findIndex((libro) => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}
