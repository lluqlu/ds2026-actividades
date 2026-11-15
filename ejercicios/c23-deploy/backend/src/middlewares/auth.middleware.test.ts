import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticate, authorize } from "./auth.middleware";
import { JWT_SECRET } from "../config/env"; // el de test, lo setea vitest.config.mts

// req/res/next falsos: vi.fn() registra cómo se los llamó.
function mocks(req: Partial<Request> = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;
  return { req: req as Request, res, next };
}

describe("authorize", () => {
  it("CLIENTE en una ruta de ADMIN → 403 y no sigue", () => {
    const { req, res, next } = mocks({ usuario: { id: 2, rol: "CLIENTE" } });
    authorize("ADMIN")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("ADMIN en una ruta de ADMIN → llama a next", () => {
    const { req, res, next } = mocks({ usuario: { id: 1, rol: "ADMIN" } });
    authorize("ADMIN")(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("authenticate", () => {
  it("token válido → llena req.usuario y llama a next", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
    const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` } });
    authenticate(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(req.usuario).toEqual({ id: 7, rol: "CLIENTE" });
  });

  it("token vencido → 401 con 'Token expirado'", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "-1s" });
    const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` } });
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token expirado" });
    expect(next).not.toHaveBeenCalled();
  });
});
