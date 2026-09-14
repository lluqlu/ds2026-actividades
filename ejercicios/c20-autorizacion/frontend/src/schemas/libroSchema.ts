import { z } from 'zod'

// AI-C19: alineado con libroCreateSchema del backend. El alta manda autorId
// (no el nombre del autor) y una URL de imagen. `genero` no existe en la API
// (el modelo usa categorías), así que se va del formulario.
export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio').max(200),
  autorId: z.number({ invalid_type_error: 'El autor es obligatorio' })
    .int()
    .positive('El autor es obligatorio'),
  precio: z.number({ invalid_type_error: 'El precio es obligatorio' })
    .int('El precio debe ser un número entero')
    .positive('El precio debe ser mayor a 0'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
  disponible: z.boolean(),
})

export type LibroFormData = z.infer<typeof libroSchema>
