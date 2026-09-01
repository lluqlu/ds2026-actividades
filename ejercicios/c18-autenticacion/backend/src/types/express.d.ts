export {};

// AI-C18: Request de Express no trae `usuario`. Se lo agregamos nosotros.
// Opcional (?) porque en una ruta pública nadie lo llenó.
declare global {
  namespace Express {
    interface Request {
      usuario?: { id: number; rol: "ADMIN" | "CLIENTE" };
    }
  }
}
