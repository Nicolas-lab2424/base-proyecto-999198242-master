import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"



const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { register } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (passwordError) return;

    const newUser = {
      username,
      email,
      password
    }

    console.log(newUser)
    setSuccess("Usuario registrado con éxito")

    setUsername("")
    setEmail("")
    setPassword("")

    const isRegister = await register(username, password, email)
    console.log(isRegister)

    if (isRegister) {
      setSuccess("Usuario registrado con éxito")

      //reset de formulario
      setUsername("")
      setEmail("")
      setPassword("")

      //despues de 3 s se borra el mensaje de exito.
      setTimeout(() => {
        setSuccess("")
        navigate("/")
      }, 1500)
    }


  }

  const handleUsername = async (e) => {
    setUsername(e.target.value)
    console.log("Good")
  }


  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    if (value.length < 5) {
      setPasswordError("La contraseña debe tener al menos 5 caracteres.")
    } else if (/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value)) {
      setPasswordError("No se permiten símbolos especiales como %, *, (, etc.")
    } else {
      setPasswordError("")
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)

  }

  return (
    <Layout>
      <h1 className="text-center fw-bold mt-4" style={{ color: "#1E3A8A" }}>Registrate</h1>

      <section className="container mt-4" style={{ backgroundColor: "#F3F4F6", borderRadius: "8px", padding: "2rem" }}>
        <div className="row justify-content-center">
          <div className="col-md-5" >
            <form onSubmit={handleSubmit} className="p-3 border rounded-3 bg-light" style={{ backgroundColor: "#FFFFFF" }}>
              <h2 className="text-center fs-5 text-muted mb-4" style={{ color: "#1E3A8A" }} > Hola, bienvenido</h2>
              <div className="mb-3">
                <label className="form-label small fw-semibold" style={{ color: "#1E3A8A" }}>Username:</label>
                <input
                  style={{ borderColor: "#3B82F6" }}
                  required
                  className="form-control form-control-sm"
                  type="text"
                  onChange={handleUsername}
                  value={username}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold" style={{ color: "#1E3A8A" }}>Correo electrónico:</label>
                <input required
                  style={{ borderColor: "#3B82F6" }}
                  className="form-control form-control-sm"
                  type="email"
                  onChange={handleEmail}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold" style={{ color: "#1E3A8A" }}>Contraseña:</label>
                <input required
                  style={{ borderColor: "#3B82F6" }}
                  className="form-control form-control-sm"
                  type="password"
                  onChange={handlePassword}
                  value={password}
                />
              </div>
              {passwordError && (
                <p className="text-danger small mb-2  ">{passwordError}</p>
              )}
              <button className="btn w-100 btn-sm" style={{
                backgroundColor: "#1E3A8A",
                color: "#FFFFFF",
                border: "none"
              }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#3B82F6")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1E3A8A")}>Ingresar</button>
            </form>

            {
              error && <p className=" small text-danger mt-3">{error}</p>
            }
            {
              success && <p className=" small text-success mt-3">{success}</p>
            }
          </div>
        </div>


      </section>
    </Layout >
  )
}

export { Register }