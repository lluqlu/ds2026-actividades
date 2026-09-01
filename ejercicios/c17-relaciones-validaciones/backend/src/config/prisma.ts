import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Correr desde la PC (npm run dev / tsx prisma/seed.ts) necesita cargar
// backend/.env. En Docker las variables vienen por env_file y no hay archivo.
try {
  process.loadEnvFile();
} catch {
  // sin .env local: se ignora
}

// El adapter es el driver: el que realmente habla TCP con PostgreSQL.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Una sola instancia para toda la app: abre un pool de conexiones y lo reusa.
export const prisma = new PrismaClient({ adapter });
