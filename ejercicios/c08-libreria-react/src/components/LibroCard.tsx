import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'

type LibroCardProps = {
  titulo: string
  autor: string
  precio: number
  genero: string
}

function LibroCard({ titulo, autor, precio, genero }: LibroCardProps) {
  const [likes, setLikes] = useState(0)

  return (
    <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text>{genero}</Card.Text>
        <Card.Text className="fw-bold">${precio.toLocaleString('es-AR')}</Card.Text>
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm">Ver más</Button>
          <Button variant="outline-danger" size="sm" onClick={() => setLikes(likes + 1)}>
            Me gusta {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default LibroCard
