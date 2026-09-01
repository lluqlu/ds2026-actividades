import type { SignOptions } from "jsonwebtoken";

// Para correr desde la PC: carga backend/.env si está (en Docker viene por env_file).
try {
  process.loadEnvFile();
} catch {
  // sin .env local: se ignora
}

// Barrera de seguridad: centraliza las variables, las tipa, y si falta el
// secreto la app no arranca (mejor romper al inicio que firmar con vacío).
function obligatorio(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) throw new Error(`Falta ${nombre} en el .env`);
  return valor;
}

export const JWT_SECRET = obligatorio("JWT_SECRET");
export const JWT_EXPIRES_IN: SignOptions["expiresIn"] = "2h";
export const SALT_ROUNDS = 10;
