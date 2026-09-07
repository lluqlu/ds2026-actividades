import { prisma } from "../config/prisma";
import { Libro, Prisma } from "../generated/prisma/client";

// Tipos derivados del include, con GetPayload: el tipo sale del cliente.
export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

// Listado: cada libro con su autor.
export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({ where: { disponible }, include: { autor: true } });
}

// Detalle: autor + categorías.
export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true },
  });
}

// AI-C19: create y update devuelven el libro con su autor anidado, igual que
// findAll/findById. Así el contrato es consistente: el front recibe siempre
// la misma forma, haga GET o POST.
export async function create(datos: Omit<Libro, "id">): Promise<LibroConAutor> {
  return prisma.libro.create({ data: datos, include: { autor: true } });
}

export async function update(
  id: number,
  datos: Partial<Omit<Libro, "id">>
): Promise<LibroConAutor | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;
  return prisma.libro.update({
    where: { id },
    data: datos,
    include: { autor: true },
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.libro.delete({ where: { id } });
  return true;
}
