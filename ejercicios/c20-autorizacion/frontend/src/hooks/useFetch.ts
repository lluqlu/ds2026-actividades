import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

// AI-C19: el hook de lectura ahora pasa por apiFetch (base URL + token +
// mensaje de error real). El contrato del hook no cambia: { data, loading, error }.
export function useFetch<T>(ruta: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        setData(await apiFetch<T>(ruta));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [ruta]);

  return { data, loading, error };
}
