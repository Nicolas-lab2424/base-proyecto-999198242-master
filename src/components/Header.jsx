import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()




  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      {/* barra  */}
      <nav className="fixed-top barra navbar navbar-expand-lg" style={{ backgroundColor: "#1E3A8A" }} >
        <div className="container-fluid">

          {/* Logo */}


          <Link
            className="navbar-brand fw-bold text-white"
            to="/"
            style={{
              fontFamily: "Edu NSW ACT Cursive",
              fontSize: "1.8rem",
              letterSpacing: "1px",
              textDecoration: "none"
            }}
          >
            LOGO
          </Link>

          {/* menu hamburguesa*/}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/SobreNosotros" className="nav-link  text-white">Sobre Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link  text-white">Inicio</Link>
              </li>

              {user && (
                <>

                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link  text-white">Dashboard</Link>
                  </li>

                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-danger ms-2"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}

              {!user && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link  text-white">Registrate</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header >
  )
}

export { Header }