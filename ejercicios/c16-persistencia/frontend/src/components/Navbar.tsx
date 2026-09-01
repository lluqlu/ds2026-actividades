import { Container, Navbar as BootstrapNavbar } from 'react-bootstrap'

type NavbarProps = {
  titulo: string
}

function Navbar({ titulo }: NavbarProps) {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Container>
        <BootstrapNavbar.Brand>{titulo}</BootstrapNavbar.Brand>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
