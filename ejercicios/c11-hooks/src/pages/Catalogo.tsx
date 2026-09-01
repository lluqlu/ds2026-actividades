import { useEffect } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

function Catalogo() {
  // Los datos ya no vienen por props: los pide el hook desde el mock.
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json')

  // useEffect directo: efecto secundario (cambiar el título de la pestaña).
  useEffect(() => {
    document.title = 'Catálogo · Mi Librería'
  }, [])

  if (loading) return <Spinner animation="border" role="status" />
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
