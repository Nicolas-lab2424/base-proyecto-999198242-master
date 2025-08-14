
import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const { login } = useAuth()

  const nagivate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log({ username, password })
    const isLogin = await login(username, password)

    if (isLogin) {
      setUsername("")
      setPassword("")
      nagivate("/")
    }

    if (username !== "johnd" || password !== "m38rmF$") {
      setError("Usuario o contraseña incorrectos");
    } else {
      setError("");

    }

  }

  return (
    <Layout>

      <h1 className="text-center fw-bold mt-4" style={{ color: "#1E3A8A" }}>Inicia sesión</h1>

      <section className="container mt-4"
        style={{
          backgroundColor: "#F3F4F6",
          borderRadius: "8px",
          padding: "2rem",
        }}>
        <div className="row justify-content-center">
          <div className="col-md-5 ">
            <form onSubmit={handleLogin} className="p-3 border rounded-3 bg-light" style={{ backgroundColor: "#FFFFFF" }}>
              <h2 className="text-center fs-5 text-muted mb-3" style={{ color: "#1E3A8A" }}>Hola, bienvenido de nuevo</h2>
              <p className="text-center small mb-4" style={{ color: "#6B7280" }}>
                <strong>Usuario de prueba:</strong> <span className="fst-italic">johnd</span> / <span className="fst-italic">m38rmF$</span>
              </p>

              {error && <p className="text-center text-danger fw-semibold">{error}</p>}
              <div className="mb-3">
                <label className="form-label small fw-semibold" style={{ color: "#1E3A8A" }}>Nombre de usuario:</label>
                <input
                  className="form-control form-control-sm"
                  style={{ borderColor: "#3B82F6" }}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username} />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-semibold" style={{ color: "#1E3A8A" }}>Contraseña:</label>
                <input
                  className="form-control form-control-sm"
                  style={{ borderColor: "#3B82F6" }}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </div>
              <button
                className="btn w-100 btn-sm"
                style={{
                  backgroundColor: "#1E3A8A",
                  color: "#FFFFFF",
                  border: "none"
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#3B82F6")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1E3A8A")}>Ingresar</button>
              <div className="text-center mt-3">
                <span>¿No tienes cuenta? </span>
                <Link to="/Register" className="text-primary fw-semibold">
                  Regístrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export { Login }