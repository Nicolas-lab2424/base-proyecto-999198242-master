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
      setPasswordError("") // no hay error
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)

  }

  return (
    <Layout>
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              required
              type="text"
              onChange={handleUsername}
              value={username}
            />
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input required
              type="email"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input required
              type="password"
              onChange={handlePassword}
              value={password}
            />
          </div>
          {passwordError && (
            <p style={{ color: "red", fontSize: "0.9em" }}>{passwordError}</p>
          )}
          <button>Ingresar</button>
        </form>

        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
        {
          success && <p style={{ color: "green" }}>{success}</p>
        }
      </section>
    </Layout>
  )
}

export { Register }