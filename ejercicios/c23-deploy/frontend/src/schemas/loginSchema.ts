import { z } from "zod";

// AI-C19: el login NO valida fortaleza (eso es del registro). Sólo que el
// email tenga forma de email y que la contraseña no venga vacía.
export const loginSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type LoginValidado = z.infer<typeof loginSchema>;
