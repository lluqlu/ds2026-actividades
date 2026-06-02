import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="py-4">
      <h2>Detalle del libro #{id}</h2>
      <p className="text-muted">Próximamente más información sobre este libro.</p>
      <Button as={Link as never} to="/catalogo" variant="secondary">
        Volver al catálogo
      </Button>
    </div>
  )
}

export default LibroDetalle
