type FooterProps = {
  texto: string
}

function Footer({ texto }: FooterProps) {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">{texto}</p>
    </footer>
  )
}

export default Footer
