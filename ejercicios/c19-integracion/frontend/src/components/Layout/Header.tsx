import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { borrarToken, obtenerToken } from '../../services/sesion'

function Header() {
  const navigate = useNavigate()
  // useLocation: al cambiar de ruta el Header se reevalúa y el botón
  // Ingresar/Salir se actualiza tras el login/logout (sin AuthContext todavía).
  useLocation()

  const estaLogueado = !!obtenerToken()

  const manejarSesion = () => {
    if (estaLogueado) {
      borrarToken()
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Librería</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="ms-auto align-items-md-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>
            <Button
              size="sm"
              variant={estaLogueado ? 'outline-light' : 'light'}
              className="ms-md-3 mt-2 mt-md-0"
              onClick={manejarSesion}
            >
              {estaLogueado ? 'Salir' : 'Ingresar'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
