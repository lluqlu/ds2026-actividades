import { Alert, Badge, Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json')

  if (loading) return <Spinner animation="border" role="status" />
  if (error) return <Alert variant="danger">{error}</Alert>

  const libro = (libros ?? []).find(l => l.id === Number(id))

  if (!libro) {
    return (
      <div className="py-4">
        <h2>Libro no encontrado</h2>
        <Link to="/catalogo"><Button variant="secondary">Volver al catálogo</Button></Link>
      </div>
    )
  }

  return (
    <div className="py-4" style={{ maxWidth: 480 }}>
      <h2>{libro.titulo}</h2>
      <p className="text-muted">{libro.autor}</p>
      <p><strong>Género:</strong> {libro.genero}</p>
      <p><strong>Precio:</strong> ${libro.precio.toLocaleString('es-AR')}</p>
      <Badge bg={libro.disponible ? 'success' : 'secondary'} className="mb-3">
        {libro.disponible ? 'Disponible' : 'Sin stock'}
      </Badge>
      <div>
        <Link to="/catalogo"><Button variant="secondary">Volver al catálogo</Button></Link>
      </div>
    </div>
  )
}

export default LibroDetalle
