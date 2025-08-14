import { Layout } from "../components/Layout"

const SobreNosotros = () => {
  return (
    <Layout>
      <div className="container my-5">

        <h1 className="text-center mb-4" style={{ color: "#1E3A8A", fontWeight: "bold" }}>
          Sobre Nosotros
        </h1>


        <p className="text-center text-muted mb-5">
          Conoce el "porque" de nuestro proyecto
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold" style={{ color: "#1E3A8A" }}>
                  Nuestro proyecto
                </h5>
                <p className="card-text text-muted">
                  Proyecto de e-commerce desarrollado en el curso de React, que simula una tienda online con autenticación, gestión de productos y navegación sencilla, aplicando buenas prácticas de frontend y diseño responsive.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold" style={{ color: "#1E3A8A" }}>
                  A quien esta dirigido?
                </h5>
                <p className="card-text text-muted">
                  Esta aplicación está pensada para desarrolladores y estudiantes que desean aprender React y otras tecnologías modernas de desarrollo web. Además, funciona como referencia práctica para implementar funciones habituales en proyectos web. Permite a los usuarios explorar productos, registrarse, iniciar sesión y administrar el catálogo, brindando así una experiencia de e-commerce completa.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold" style={{ color: "#1E3A8A" }}>
                  Tecnologias
                </h5>
                <p className="card-text text-muted">
                  Este proyecto se desarrolló con React, utilizando componentes reutilizables y manejo de estado, y React Router para la navegación. Los estilos combinan Bootstrap y CSS personalizado para un diseño responsive, mientras que Git y GitHub se usaron para el control de versiones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export { SobreNosotros }