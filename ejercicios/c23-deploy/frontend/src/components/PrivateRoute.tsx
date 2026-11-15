import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types/sesionType";

// Layout route (sin path): agrupa la protección de un grupo de rutas de una
// sola vez, en vez de envolver cada <Route> a mano. rol opcional: sin rol,
// solo exige estar logueado.
// Mismo orden que authenticate → authorize: cargando → usuario → rol.
export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();

  // 1. ¿ya sé quién sos?
  if (cargando) return <Spinner animation="border" />;
  // 2. ¿sos alguien? (401)
  if (!usuario) return <Navigate to="/login" replace />;
  // 3. ¿podés? (403)
  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;

  // sí: pasá
  return <Outlet />;
}
