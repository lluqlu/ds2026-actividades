import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Correr desde la PC (npm run dev / tsx prisma/seed.ts) necesita cargar
// backend/.env. En Docker las variables vienen por env_file y no hay archivo.
try {
  process.loadEnvFile();
} catch {
  // sin .env local: se ignora
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({
  adapter,
  // AI-C18: seguro por defecto — el passwordHash no sale nunca por accidente.
  // El login lo pide explícito con `omit: { passwordHash: false }`.
  omit: { usuario: { passwordHash: true } },
});
