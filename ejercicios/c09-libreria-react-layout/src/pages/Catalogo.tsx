import { Col, Row } from 'react-bootstrap'
import LibroCard from '../components/LibroCard'
import type { Libro } from '../types/libro'

const libros: Libro[] = [
  { id: 1, titulo: 'El Aleph', autor: 'Jorge Luis Borges', precio: 15000, genero: 'Cuentos' },
  { id: 2, titulo: 'Rayuela', autor: 'Julio Cortázar', precio: 18000, genero: 'Novela' },
  { id: 3, titulo: 'Ficciones', autor: 'Jorge Luis Borges', precio: 14000, genero: 'Cuentos' },
  { id: 4, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 22000, genero: 'Novela' },
  { id: 5, titulo: 'El túnel', autor: 'Ernesto Sábato', precio: 12000, genero: 'Novela' },
  { id: 6, titulo: 'Santa Evita', autor: 'Tomás Eloy Martínez', precio: 16000, genero: 'Novela' },
]

function Catalogo() {
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
