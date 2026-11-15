import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// AI-C21: los tests corren desde la PC (npm test), con sólo el contenedor
// "db" levantado. Se toma el DATABASE_URL del .env y se cambia el host "db"
// (el nombre dentro de la red de Docker) por localhost.
const env = loadEnv("test", process.cwd(), "");
const databaseUrl = (env.DATABASE_URL ?? "").replace("@db:", "@localhost:");

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests", // nunca el real
      DATABASE_URL: databaseUrl,
    },
  },
});
