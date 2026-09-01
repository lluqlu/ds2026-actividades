import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { libroSchema, type LibroFormData } from '../schemas/libroSchema'
import type { Libro } from '../types/libro'

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro'

const GENEROS = ['Cuentos', 'Novela', 'Poesía', 'Ensayo', 'Ciencia ficción', 'Terror', 'Biografía']

interface Props {
  onAgregar: (libro: Libro) => void
}

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LibroFormData>({
    resolver: zodResolver(libroSchema),
    defaultValues: { disponible: true },
  })

  const onSubmit = (data: LibroFormData) => {
    onAgregar({ ...data, id: Date.now(), imagen: IMG_PLACEHOLDER })
    navigate('/catalogo')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>

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
        <Form.Check
          label="Disponible"
          {...register('disponible')}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">Agregar libro</Button>
        <Button type="button" variant="outline-secondary" onClick={() => navigate('/catalogo')}>Cancelar</Button>
      </div>
    </Form>
  )
}

export default LibroNuevo
