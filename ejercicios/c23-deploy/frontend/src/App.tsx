import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Login from './pages/Login'
import SinPermiso from './pages/SinPermiso'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'

// AI-C19: se fue el estado en memoria (librosIniciales). Cada página pide sus
// datos a la API real. App sólo declara las rutas.
// AI-C20: AuthProvider arriba de todo lo que consume useAuth (Header incluido).
// /libros/nuevo pasa a ser solo ADMIN, protegida por PrivateRoute como layout route.
function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
