import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Header() {
  const navigate = useNavigate()
  const { usuario, logout, tieneRol } = useAuth()

  const manejarSesion = () => {
    if (usuario) {
      logout()
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
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>
            )}
            {usuario && (
              <Navbar.Text className="ms-md-3">Hola, {usuario.nombre}</Navbar.Text>
            )}
            <Button
              size="sm"
              variant={usuario ? 'outline-light' : 'light'}
              className="ms-md-3 mt-2 mt-md-0"
              onClick={manejarSesion}
            >
              {usuario ? 'Salir' : 'Ingresar'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
