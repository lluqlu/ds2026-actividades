/// <reference types="vite/client" />

// AI-C19: tipa import.meta.env para que VITE_API_URL no sea `any`.
// Ojo: esto tipa lo declarado, no detecta el typo (VITE_API_UR compila igual).
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
