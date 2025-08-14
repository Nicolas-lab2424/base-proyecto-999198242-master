import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 400)

    return () => clearTimeout(handler)
  }, [searchTerm])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
        // fetchingProducts()
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())

  )


  return (
    <Layout>
      <section className="text-center my-5">
        <h1 className="fw-bold" style={{ color: "#1E3A8A" }}>Bienvenido a Nuestra Tienda</h1>
        <p style={{ color: "#1E3A8A" }} className="lead text-muted">Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </section>

      <section className="my-5">
        <h2 className="text-center text-muted mb-4">¿Por qué elegirnos?</h2>
        <div className="row text-center">
          {[
            { title: "Envíos a todo el país", text: "Recibí tu compra en la puerta de tu casa estés donde estés." },
            { title: "Pagos seguros", text: "Trabajamos con plataformas que garantizan tu seguridad." },
            { title: "Atención personalizada", text: "Estamos disponibles para ayudarte en todo momento." }
          ].map((item, idx) => (
            <div key={idx} className="col-md-4 mb-4">
              <div style={{ backgroundColor: "#F9FAFB" }} className="p-4 border rounded shadow-sm h-100">
                <h3 style={{ color: "#1E3A8A" }} className="fw-bold">{item.title}</h3>
                <p className="text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      <section className="my-5">
        <h2 className="text-center mb-4 fw-semibold" style={{ color: "#1E3A8A" }}>Nuestros productos</h2>
        <p className="text-center text-muted mb-4">Elegí entre nuestras categorías más populares.</p>


        <div className="d-flex justify-content-center mb-4">
          <input
            className="form-control w-50 shadow-sm"
            type="text"
            placeholder="Buscar por título o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderColor: "#1E3A8A", padding: "8px", marginBottom: "16px", width: "30%" }}
          />
        </div>



        {
          showPopup && <section style={{
            maxWidth: "500px",
            backgroundColor: "#f8f9fa",
            borderColor: "#dee2e6"
          }} className="popup-edit  mb-4 p-4 border rounded shadow-sm">
            <h2 className="fw-semibold mb-3" style={{ color: "#1d3c8a" }}>Editando producto.</h2>
            <button className="btn btn-secondary mb-3" onClick={() => setShowPopup(null)}>Cerrar</button>
            <form className="d-flex flex-column gap-2" onSubmit={handleUpdate}>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
                style={{
                  border: "1px solid #1d3c8a",
                  boxShadow: "none"
                }}
              />
              <input
                className="form-control"
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
                style={{
                  border: "1px solid #1d3c8a",
                  boxShadow: "none"
                }}
              />
              <textarea
                className="form-control"
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
                style={{
                  border: "1px solid #1d3c8a",
                  boxShadow: "none"
                }}
              ></textarea>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
                style={{
                  border: "1px solid #1d3c8a",
                  boxShadow: "none"
                }}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
                style={{
                  border: "1px solid #1d3c8a",
                  boxShadow: "none"
                }}
              />
              <button className="btn btn-primary mt-2"
                style={{
                  background: "linear-gradient(90deg, #1d3c8a, #2449a3)",
                  border: "none"
                }}>Actualizar</button>
            </form>
          </section>
        }
        <div className="container my-5">
          <div className="row g-4">

            {filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={`Imagen de ${product.title}`}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold" style={{ color: "#1E3A8A" }}>{product.title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                      {product.description.length > 60
                        ? product.description.slice(0, 60) + "..."
                        : product.description}
                    </p>
                    <p className="text-secondary mb-1">{product.category}</p>
                    <p className="fw-semibold fs-5" style={{ color: "#1E3A8A" }}>${product.price}</p>
                    {user && (
                      <div className="mt-auto d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleOpenEdit(product)}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export { Home }
