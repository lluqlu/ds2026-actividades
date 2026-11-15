import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// La cara del 403: PrivateRoute manda acá cuando hay sesión pero no el rol.
function SinPermiso() {
  return (
    <Alert variant="warning">
      <Alert.Heading>Sin permiso</Alert.Heading>
      <p>No tenés los permisos necesarios para ver esta página.</p>
      <Link to="/catalogo" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </Alert>
  );
}

export default SinPermiso;
