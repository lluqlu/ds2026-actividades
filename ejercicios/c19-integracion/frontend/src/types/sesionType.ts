// AI-C19: lo que devuelve POST /api/auth/login.
export interface Sesion {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: "ADMIN" | "CLIENTE";
  };
}
