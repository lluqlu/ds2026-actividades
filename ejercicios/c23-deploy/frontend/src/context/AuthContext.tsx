import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { apiFetch } from "../services/api";
import { borrarToken, guardarToken, obtenerToken } from "../services/sesion";
import type { Credenciales, Rol, Sesion, Usuario } from "../types/sesionType";

// AI-C20: mismo patrón que un context de C12 (contexto + provider + hook
// propio), pero el dato que reparte es la sesión en vez de un filtro.
interface AuthContextType {
  usuario: Usuario | null; // null = nadie logueado
  cargando: boolean; // true mientras averiguamos quién sos
  estaAutenticado: boolean; // usuario !== null, para leer más cómodo
  tieneRol: (rol: Rol) => boolean; // usuario?.rol === rol
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

// AI-C21: se exporta para que los tests inyecten un usuario sin pasar por la API.
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  // Rehidratación: F5 borra el estado de React, no el token. Se le
  // pregunta al back quién sos en vez de decodificar el JWT acá.
  useEffect(() => {
    if (!obtenerToken()) return; // sin token no hay nada que averiguar

    apiFetch<Usuario>("/auth/yo")
      .then(setUsuario)
      .catch(() => borrarToken()) // vencido o inválido: se limpia
      .finally(() => setCargando(false));
  }, []);

  function logout() {
    borrarToken();
    setUsuario(null);
  }

  async function login(credenciales: Credenciales) {
    const sesion = await apiFetch<Sesion>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  }

  // Un 401 con token (apiFetch lo detecta) es una sesión que venció en el
  // medio, no un login fallido: se cierra sola.
  useEffect(() => {
    window.addEventListener("sesion-expirada", logout);
    return () => window.removeEventListener("sesion-expirada", logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: usuario !== null,
        tieneRol: (rol) => usuario?.rol === rol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return contexto;
}
