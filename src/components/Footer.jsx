const Footer = () => {
  return (
    <footer className="py-3 mt-5" style={{
      backgroundColor: "#F3F4F6",
      borderTop: "2px solid 3B82F6"
    }}>
      <div className="container text-center"><p className="mb-1 fw-semibold" style={{ color: "#1E3A8A", fontSize: "0.95rem" }}>Sitio desarrollado por<a href="https://youtu.be/dQw4w9WgXcQ?si=LL-ymn4eSrJEL6sC"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#3B82F6",
          textDecoration: "none",
        }}
        onMouseOver={(e) => (e.target.style.color = "#1E3A8A")}
        onMouseOut={(e) => (e.target.style.color = "#3B82F6")}> Nicolas Galeano</a></p>
        <small style={{
          color: "#1E3A8A",
          fontSize: "0.8rem",
        }}> © {new Date().getFullYear()} Todos los derechos reservados.</small></div>
    </footer>
  )
}

export { Footer }