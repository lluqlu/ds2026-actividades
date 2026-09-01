import { Autor } from "../types/autor.types";

// Mismos datos en memoria. Autor no tiene relación con Libro todavía
// (el libro guarda el nombre del autor como string): eso llega en C17.
const autores: Autor[] = [
  { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { id: 2, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { id: 3, nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { id: 4, nombre: "Ernesto Sábato", nacionalidad: "Argentina" },
  { id: 5, nombre: "Tomás Eloy Martínez", nacionalidad: "Argentina" },
];

let proximoId = 6;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const i = autores.findIndex((autor) => autor.id === id);
  if (i === -1) return undefined;
  autores[i] = { id, ...datos };
  return autores[i];
}

export function remove(id: number): boolean {
  const i = autores.findIndex((autor) => autor.id === id);
  if (i === -1) return false;
  autores.splice(i, 1);
  return true;
}
