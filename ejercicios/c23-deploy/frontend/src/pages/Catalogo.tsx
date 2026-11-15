import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

// AI-C19: el catálogo lee de la API real (GET /api/libros). Ya no recibe
// los libros por props desde App.
function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros')

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <>
      <h2>Catálogo</h2>
      <Row className="g-4 mt-2">
        {(libros ?? []).map(libro => (
          <Col key={libro.id} xs={12} sm={6} md={4} lg={3}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Catalogo
