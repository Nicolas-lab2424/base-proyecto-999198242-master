import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import "../styles/components/Header.css"
const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      {/* barra  */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png"
              alt="logo"
              height="40"
            />
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


              {user && (
                <>

                  <li className="nav-item">
                    <Link to="/" className="nav-link">Inicio</Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
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
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/registrate" className="nav-link">Registrate</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }