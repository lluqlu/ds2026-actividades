import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";

// AI-C21: app.ts arma la app y la exporta SIN escuchar en un puerto, así
// supertest la puede usar directo en los tests. index.ts es el que la levanta.
const app = express();

// AI-C19: el origen permitido llega por entorno (una lista, nunca "*").
// cors va ANTES de express.json() y de las rutas: si queda después no
// aparece ningún header Access-Control-* y la falla es total, no parcial.
const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// AI-C19: 404 en JSON. Sin esto una ruta inexistente cae en el HTML por
// defecto de Express y el front revienta al hacer res.json().
app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler); // siempre último

export default app;
