import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

// AI-C23: portadas reales (Open Library / refactoring.guru) en vez de fotos genéricas.
// AI-C18: además de autores, categorías y libros, un usuario por rol con la
// contraseña hasheada. `upsert` => corre dos veces sin explotar.

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ensayo" },
  { nombre: "Tecnico" },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Alexander Shvets", nacionalidad: "Ucrania" },
  { nombre: "Ray Bradbury", nacionalidad: "Estados Unidos" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Paulo Coelho", nacionalidad: "Brasil" },
  { nombre: "Yuval Noah Harari", nacionalidad: "Israel" },
  { nombre: "Dan Brown", nacionalidad: "Estados Unidos" },
  { nombre: "Harper Lee", nacionalidad: "Estados Unidos" },
  { nombre: "Carlos Ruiz Zafón", nacionalidad: "España" },
];

const libros = [
  { titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://covers.openlibrary.org/b/id/13499066-L.jpg", disponible: true, cats: ["Novela"] },
  { titulo: "Patrones de diseño", autor: "Alexander Shvets", precio: 8500, imagen: "https://refactoring.guru/images/patterns/book/web-cover-es.png", disponible: true, cats: ["Tecnico"] },
  { titulo: "Farenheit 451", autor: "Ray Bradbury", precio: 5200, imagen: "https://covers.openlibrary.org/b/id/12993656-L.jpg", disponible: false, cats: ["Novela"] },
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 6200, imagen: "https://covers.openlibrary.org/b/id/13009946-L.jpg", disponible: true, cats: ["Novela"] },
  { titulo: "1984", autor: "George Orwell", precio: 5400, imagen: "https://covers.openlibrary.org/b/id/8745958-L.jpg", disponible: true, cats: ["Novela", "Ensayo"] },
  { titulo: "El alquimista", autor: "Paulo Coelho", precio: 4300, imagen: "https://covers.openlibrary.org/b/id/12674818-L.jpg", disponible: true, cats: ["Novela"] },
  { titulo: "Sapiens: De animales a dioses", autor: "Yuval Noah Harari", precio: 7800, imagen: "https://covers.openlibrary.org/b/id/8634250-L.jpg", disponible: false, cats: ["Ensayo"] },
  { titulo: "El código Da Vinci", autor: "Dan Brown", precio: 5100, imagen: "https://covers.openlibrary.org/b/id/9255229-L.jpg", disponible: true, cats: ["Novela"] },
  { titulo: "Matar a un ruiseñor", autor: "Harper Lee", precio: 4700, imagen: "https://covers.openlibrary.org/b/id/7376945-L.jpg", disponible: true, cats: ["Novela"] },
  { titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", precio: 6900, imagen: "https://covers.openlibrary.org/b/id/10107644-L.jpg", disponible: false, cats: ["Novela"] },
];

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  for (const { autor, cats, ...datos } of libros) {
    const existe = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (existe) {
      // AI-C23: si ya está, sólo se refresca la portada (re-correr el seed
      // contra una DB existente, p. ej. Neon, actualiza las imágenes).
      await prisma.libro.update({ where: { id: existe.id }, data: { imagen: datos.imagen } });
      continue;
    }
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }

  console.log("Seed listo: 10 autores, 3 categorías, 10 libros, 2 usuarios.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
