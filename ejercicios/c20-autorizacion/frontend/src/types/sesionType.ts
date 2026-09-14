// AI-C20: Sesion se separa en Usuario (lo reutiliza el AuthContext) y
// Credenciales (lo que pide login). Rol queda como tipo propio porque
// AuthContext.tieneRol lo usa.
export type Rol = "ADMIN" | "CLIENTE";

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}

export interface Sesion {
  token: string;
  usuario: Usuario;
}

export interface Credenciales {
  email: string;
  password: string;
}
