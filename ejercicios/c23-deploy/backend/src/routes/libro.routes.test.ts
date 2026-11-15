import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

// Integración con supertest sobre casos de la matriz de permisos de
// POST /api/libros. NO necesita DB: en todos estos casos la request se corta
// en authenticate / authorize / validate, antes de llegar al controller.
const libroNuevo = { titulo: "Bestiario", precio: 9000, imagen: "https://img/b.jpg", autorId: 1 };
const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("POST /api/libros — matriz de permisos", () => {
  it("sin token → 401", async () => {
    const res = await request(app).post("/api/libros").send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    expect(res.status).toBe(403);
  });

  it("ADMIN con body inválido → 400 (pasó la autorización, falló la validación)", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });
    expect(res.status).toBe(400);
  });
});
