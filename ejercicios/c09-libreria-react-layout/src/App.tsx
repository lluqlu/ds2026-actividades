import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Navbar titulo="Mi Librería" />
      <Home />
      <Footer texto="Mi Librería 2026" />
    </div>
  )
}

export default App
