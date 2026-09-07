import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Login from './pages/Login'

// AI-C19: se fue el estado en memoria (librosIniciales). Cada página pide sus
// datos a la API real. App sólo declara las rutas.
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App
