import { Badge, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import type { Libro } from '../types/libro'

interface Props {
  libros: Libro[]
}

function LibroDetalle({ libros }: Props) {
  const { id } = useParams<{ id: string }>()
  const libro = libros.find(l => l.id === Number(id))

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
