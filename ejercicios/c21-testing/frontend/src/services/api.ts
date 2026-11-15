import { obtenerToken } from "./sesion";

// AI-C19: una sola puerta de salida al backend.
// - arma la URL desde la env (un solo lugar con la base)
// - manda el token si existe
// - preserva el mensaje de error real de la API
const BASE = import.meta.env.VITE_API_URL;

// AI-C20: con status, para poder distinguir un 403 (sin permiso) de
// cualquier otro error en las páginas que lo necesiten.
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  // El 404 de ruta puede venir en HTML: si no parsea, queda null.
  const cuerpo = await res.json().catch(() => null);

  // 401 con token: no fue un login fallido (ese no manda token), fue una
  // sesión que venció en el medio. Avisa al mundo; AuthProvider escucha.
  if (res.status === 401 && token) {
    window.dispatchEvent(new Event("sesion-expirada"));
  }

  if (!res.ok) {
    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}
