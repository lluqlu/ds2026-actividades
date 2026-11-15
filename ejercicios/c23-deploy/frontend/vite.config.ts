/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // AI-C21: Vitest reusa esta config. Los componentes necesitan un DOM:
  // jsdom lo simula. setupFiles corre antes de cada archivo de test.
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
