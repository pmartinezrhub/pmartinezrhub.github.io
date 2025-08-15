import Layout from '../components/Layout'

export default function CV() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Currículum</h1>
      <a href="/cv_pablomartínezrivas.pdf" download className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Descargar PDF
      </a>

      {/* <section className="mt-6">
        <h2 className="text-xl font-semibold">Experiencia</h2>
        <p><strong>Desarrollador Web</strong> – Empresa X (2020 - Presente)</p>
        <ul className="list-disc pl-5">
          <li>Desarrollo de aplicaciones web con Django y React</li>
          <li>Optimización de rendimiento y SEO</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Educación</h2>
        <p>Grado en Ingeniería Informática – Universidad Y</p>
      </section> */}
    </Layout>
  )
}
