import { describe, it, expect } from "vitest";
import { libroCreateSchema } from "./libro.validation";

// Unitario puro: sólo el schema Zod, sin Express ni DB.
const libroValido = { titulo: "Rayuela", precio: 7000, imagen: "https://img/r.jpg", autorId: 1 };

describe("libroCreateSchema", () => {
  it("acepta un libro válido y recorta espacios del título", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: "  Rayuela  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.titulo).toBe("Rayuela");
  });

  it("rechaza precio negativo con el mensaje en castellano", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].path).toEqual(["precio"]);
      expect(r.error.issues[0].message).toBe("El precio debe ser mayor a 0");
    }
  });
});
