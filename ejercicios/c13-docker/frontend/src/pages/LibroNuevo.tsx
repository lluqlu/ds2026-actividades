import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { libroSchema, type LibroFormData } from '../schemas/libroSchema'

const GENEROS = ['Cuentos', 'Novela', 'Poesía', 'Ensayo', 'Ciencia ficción', 'Terror', 'Biografía']

// AI-C11: el catálogo ahora lee del mock (libros.json). Guardar de verdad es
// un POST a un servidor que todavía no existe (Bloque de Backend), así que el
// alta valida el formulario y avisa, pero el libro nuevo aún no aparece.
function LibroNuevo() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LibroFormData>({
    resolver: zodResolver(libroSchema),
    defaultValues: { disponible: true },
  })

  const onSubmit = (data: LibroFormData) => {
    // Sin backend todavía: sólo lo mostramos por consola.
    console.log('Libro a crear (falta el POST):', data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>

      {isSubmitSuccessful && (
        <Alert variant="info">
          El formulario es válido. El libro se va a guardar cuando exista el backend.
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control {...register('autor')} isInvalid={!!errors.autor} />
        <Form.Control.Feedback type="invalid">{errors.autor?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" {...register('precio')} isInvalid={!!errors.precio} />
        <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Select {...register('genero')} isInvalid={!!errors.genero}>
          <option value="">Elegí un género...</option>
          {GENEROS.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.genero?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check label="Disponible" {...register('disponible')} />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">Agregar libro</Button>
        <Button type="button" variant="outline-secondary" onClick={() => navigate('/catalogo')}>Cancelar</Button>
      </div>
    </Form>
  )
}

export default LibroNuevo
