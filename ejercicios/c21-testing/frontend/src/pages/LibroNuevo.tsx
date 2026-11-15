import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { libroSchema, type LibroFormData } from '../schemas/libroSchema'
import { useFetch } from '../hooks/useFetch'
import { apiFetch } from '../services/api'
import type { Autor, Libro } from '../types/libro'

// AI-C19: el alta ahora hace POST /api/libros de verdad. El token lo agrega
// apiFetch solo. El autor se elige de la lista real (GET /api/autores) y se
// manda como autorId. Verificar la matriz: sin token 401, CLIENTE 403, ADMIN 201.
function LibroNuevo() {
  const navigate = useNavigate()
  const [errorApi, setErrorApi] = useState<string | null>(null)

  const { data: autores, loading, error } = useFetch<Autor[]>('/autores')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroFormData>({
    resolver: zodResolver(libroSchema),
    defaultValues: { disponible: true },
  })

  const onSubmit = async (data: LibroFormData) => {
    setErrorApi(null)
    try {
      await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      navigate('/catalogo')
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido')
    }
  }

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Select
          {...register('autorId', { valueAsNumber: true })}
          isInvalid={!!errors.autorId}
        >
          <option value="">Elegí un autor...</option>
          {(autores ?? []).map(a => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          {...register('precio', { valueAsNumber: true })}
          isInvalid={!!errors.precio}
        />
        <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control
          placeholder="https://..."
          {...register('imagen')}
          isInvalid={!!errors.imagen}
        />
        <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check label="Disponible" {...register('disponible')} />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando…' : 'Agregar libro'}
        </Button>
        <Button type="button" variant="outline-secondary" onClick={() => navigate('/catalogo')}>
          Cancelar
        </Button>
      </div>
    </Form>
  )
}

export default LibroNuevo
