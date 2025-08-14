import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    // petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <Layout>
      <h1 className="text-center fw-bold my-4" style={{ color: "#1d3c8a" }}>Panel de Administración</h1>

      <section className="container">
        <h2 className="fw-semibold mb-3" style={{ color: "#1d3c8a" }}>Cargar nuevo producto</h2>
        <form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre del producto:</label>
            <input className="form-control border-primary" type="text" name="nombre" onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div>
            <label className="form-label fw-semibold">Precio:</label>
            <input className="form-control border-primary" type="number" name="precio" onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>

          <div>
            <label className="form-label fw-semibold">Descripción:</label>
            <textarea className="form-control border-primary" name="descripcion" rows="4" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>

          {
            error && <p className="error text-danger fw-semibold">{error}</p>
          }

          <button className="btn w-100"
            style={{ backgroundColor: "#1d3c8a", color: "white" }}>Guardar producto</button>
        </form>

        {
          product && <div className="mt-4 p-3 border rounded bg-white shadow-sm">
            <h3 className="fw-bold" style={{ color: "#1d3c8a" }}>{product.title}</h3>
            <p className="text-success fw-semibold">${product.price}</p>
            <p>{product.description}</p>
          </div>
        }
      </section>
    </Layout >
  )
}

export { Dashboard }
