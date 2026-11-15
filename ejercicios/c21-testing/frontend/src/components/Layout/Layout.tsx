import type { ReactNode } from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="py-4 flex-grow-1">{children}</Container>
      <Footer />
    </div>
  )
}

export default Layout
