import { describe, it, expect } from 'vitest'
import { loginSchema } from './loginSchema'

// Unitario puro: el schema Zod del form de login, sin React.
describe('loginSchema', () => {
  it('acepta credenciales válidas y recorta espacios del email', () => {
    const r = loginSchema.safeParse({ email: '  admin@libreria.test ', password: 'x' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.email).toBe('admin@libreria.test')
  })

  it('rechaza un email mal formado y una contraseña vacía', () => {
    const r = loginSchema.safeParse({ email: 'no-es-mail', password: '' })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.map((i) => i.message)).toEqual([
        'Email inválido',
        'La contraseña es obligatoria',
      ])
    }
  })
})
