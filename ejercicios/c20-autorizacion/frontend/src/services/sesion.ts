// AI-C19: el token vive en localStorage y se lee/escribe sólo desde acá.
// (Envolver esto en un AuthContext queda para la próxima clase.)
const CLAVE = "token";

export const guardarToken = (t: string) => localStorage.setItem(CLAVE, t);
export const obtenerToken = () => localStorage.getItem(CLAVE);
export const borrarToken = () => localStorage.removeItem(CLAVE);
