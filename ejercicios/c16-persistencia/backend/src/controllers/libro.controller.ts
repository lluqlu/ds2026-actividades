import { Request, Response } from "express";
import * as libroService from "../services/libro.services";

// El controller traduce HTTP <-> dominio y elige el status code.
// try/catch acá porque cualquier consulta a la base puede fallar (C17 lo
// centraliza en un errorHandler).

export async function getAll(req: Request, res: Response) {
  const { disponible } = req.query;
  const filtro = disponible === undefined ? undefined : disponible === "true";
  try {
    return res.json(await libroService.findAll(filtro));
  } catch {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const libro = await libroService.findById(Number(req.params.id));
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(libro);
  } catch {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevo = await libroService.create(req.body);
    return res.status(201).json(nuevo);
  } catch {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const actualizado = await libroService.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
  } catch {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const borrado = await libroService.remove(Number(req.params.id));
    if (!borrado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send();
  } catch {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
