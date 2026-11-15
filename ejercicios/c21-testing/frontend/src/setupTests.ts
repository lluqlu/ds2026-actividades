// AI-C21: suma los matchers de jest-dom (toBeInTheDocument, etc.) a expect.
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Sin globals de Vitest, Testing Library no desmonta solo: se limpia el DOM
// a mano para que un render no se filtre al test siguiente.
afterEach(() => cleanup());
