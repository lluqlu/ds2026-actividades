// ⚠️ ESTE ARCHIVO NECESITA LA BASE DE DATOS: el login consulta la tabla
// Usuario. Antes de `npm test` levantá el contenedor db (`docker compose up -d db`)
// y corré el seed (`npx prisma db seed`). Los demás tests no tocan la DB.
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

afterAll(() => prisma.$disconnect()); // cerrar la conexión al terminar

describe("POST /api/auth/login (con DB)", () => {
  it("credenciales del seed → 200 con token y usuario sin passwordHash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({ email: "cliente@libreria.test", rol: "CLIENTE" });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("mail inexistente → el mismo 401 que una contraseña mala", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nadie@libreria.test", password: "Cliente1234" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});
