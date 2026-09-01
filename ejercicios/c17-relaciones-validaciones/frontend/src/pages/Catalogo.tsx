import { Col, Row } from 'react-bootstrap'
import LibroCard from '../components/LibroCard'
import type { Libro } from '../types/libro'

interface Props {
  libros: Libro[]
}

function Catalogo({ libros }: Props) {
  return (
    <>
      <h2>Catálogo</h2>
      <Row className="g-4 mt-2">
        {libros.map(libro => (
          <Col key={libro.id} xs={12} sm={6} md={4} lg={3}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Catalogo
