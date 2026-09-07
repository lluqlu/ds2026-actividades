import { defineConfig } from "prisma/config";

// Para correr la CLI de Prisma desde la PC: carga backend/.env si está.
// En Docker las variables ya vienen por env_file y este archivo no existe.
try {
  process.loadEnvFile();
} catch {
  // sin .env local (p. ej. dentro del contenedor): se ignora
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
