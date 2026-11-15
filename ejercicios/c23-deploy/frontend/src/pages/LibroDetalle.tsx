import { Alert, Badge, Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

// AI-C19: el detalle pide GET /api/libros/:id (que incluye autor y categorías).
// Ya no busca en un array en memoria.
function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`)

  if (loading) return <Spinner animation="border" />

  if (error || !libro) {
    return (
      <div className="py-4">
        <h2>Libro no encontrado</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Link to="/catalogo"><Button variant="secondary">Volver al catálogo</Button></Link>
      </div>
    )
  }

  return (
    <div className="py-4" style={{ maxWidth: 480 }}>
      <h2>{libro.titulo}</h2>
      <p className="text-muted">
        {libro.autor.nombre} · {libro.autor.nacionalidad}
      </p>
      {libro.categorias && libro.categorias.length > 0 && (
        <p>
          <strong>Categorías:</strong>{' '}
          {libro.categorias.map(c => c.nombre).join(', ')}
        </p>
      )}
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
