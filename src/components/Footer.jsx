const Footer = () => {
  return (
    <footer className="py-3 mt-5">
      <div className="container text-center"><p className="mb-1 fw-semibold" >Sitio desarrollado por<a href="https://youtu.be/dQw4w9WgXcQ?si=LL-ymn4eSrJEL6sC"
        target="_blank"
        rel="noopener noreferrer"

        onMouseOver={(e) => (e.target.style.color = "#1E3A8A")}
        onMouseOut={(e) => (e.target.style.color = "#3B82F6")}> Nicolas Galeano</a></p>
        <small > © {new Date().getFullYear()} Todos los derechos reservados.</small></div>
    </footer>
  )
}

export { Footer }