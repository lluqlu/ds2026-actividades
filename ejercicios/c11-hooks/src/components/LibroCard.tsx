import { useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Libro } from '../types/libro'

function LibroCard({ id, titulo, autor, precio, genero, disponible }: Libro) {
  const [likes, setLikes] = useState(0)

  return (
    <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text>{genero}</Card.Text>
        <Card.Text className="fw-bold">${precio.toLocaleString('es-AR')}</Card.Text>
        <Badge bg={disponible ? 'success' : 'secondary'} className="mb-3">
          {disponible ? 'Disponible' : 'Sin stock'}
        </Badge>
        <div className="d-flex gap-2">
          <Link to={`/libros/${id}`}><Button variant="primary" size="sm">Ver más</Button></Link>
          <Button variant="outline-danger" size="sm" onClick={() => setLikes(likes + 1)}>
            Me gusta {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default LibroCard
