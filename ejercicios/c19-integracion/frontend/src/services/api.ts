import { obtenerToken } from "./sesion";

// AI-C19: una sola puerta de salida al backend.
// - arma la URL desde la env (un solo lugar con la base)
// - manda el token si existe
// - preserva el mensaje de error real de la API
const BASE = import.meta.env.VITE_API_URL;

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

  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}
