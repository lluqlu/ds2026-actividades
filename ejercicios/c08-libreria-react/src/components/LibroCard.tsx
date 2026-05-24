import { Button, Card } from 'react-bootstrap'

type LibroCardProps = {
  titulo: string
  autor: string
  precio: number
  genero: string
}

function LibroCard({ titulo, autor, precio, genero }: LibroCardProps) {
  return (
    <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text>{genero}</Card.Text>
        <Card.Text className="fw-bold">${precio.toLocaleString('es-AR')}</Card.Text>
        <Button variant="primary" size="sm">Ver más</Button>
      </Card.Body>
    </Card>
  )
}

export default LibroCard
