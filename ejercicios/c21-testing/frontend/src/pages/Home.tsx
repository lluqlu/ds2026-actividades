import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center py-5">
      <h1>Bienvenido a Mi Librería</h1>
      <p className="lead text-muted">Encontrá los mejores libros de autores latinoamericanos.</p>
      <Link to="/catalogo">
        <Button variant="primary" size="lg">Ver catálogo</Button>
      </Link>
    </div>
  )
}

export default Home
