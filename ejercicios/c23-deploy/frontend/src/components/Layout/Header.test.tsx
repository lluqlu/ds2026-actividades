import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import type { Rol, Usuario } from '../../types/sesionType'
import Header from './Header'

// Componente con Testing Library: se inyecta la sesión por el contexto (sin
// AuthProvider, así no pega a /auth/yo) y se mira qué ve cada rol.
function renderHeader(usuario: Usuario | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  }
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

describe('Header por rol', () => {
  it('sin sesión: muestra "Ingresar" y no "Nuevo libro"', () => {
    renderHeader(null)
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument()
  })

  it('CLIENTE: saluda por nombre y NO ve "Nuevo libro"', () => {
    renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' })
    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument()
    expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument()
  })

  it('ADMIN: ve "Nuevo libro" y el botón "Salir"', () => {
    renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' })
    expect(screen.getByText('Nuevo libro')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salir' })).toBeInTheDocument()
  })
})
