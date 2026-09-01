import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import type { Libro } from './types/libro'

const librosIniciales: Libro[] = [
  { id: 1, titulo: 'El Aleph', autor: 'Jorge Luis Borges', precio: 15000, genero: 'Cuentos', disponible: true },
  { id: 2, titulo: 'Rayuela', autor: 'Julio Cortázar', precio: 18000, genero: 'Novela', disponible: true },
  { id: 3, titulo: 'Ficciones', autor: 'Jorge Luis Borges', precio: 14000, genero: 'Cuentos', disponible: true },
  { id: 4, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 22000, genero: 'Novela', disponible: false },
  { id: 5, titulo: 'El túnel', autor: 'Ernesto Sábato', precio: 12000, genero: 'Novela', disponible: true },
  { id: 6, titulo: 'Santa Evita', autor: 'Tomás Eloy Martínez', precio: 16000, genero: 'Novela', disponible: true },
]

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales)

  const agregarLibro = (nuevo: Libro) => setLibros([...libros, nuevo])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
      </Routes>
    </Layout>
  )
}

export default App
