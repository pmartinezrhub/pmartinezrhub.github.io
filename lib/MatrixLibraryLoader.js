/**
 * Responsable únicamente de la carga del script externo cmatrix.
 * Cachea la promesa a nivel de módulo para que, aunque Home se
 * monte y desmonte varias veces, el script solo se inserte una vez
 * en todo el ciclo de vida de la aplicación.
 */
export default class MatrixLibraryLoader {
  static loadPromise = null

  static load() {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('MatrixLibraryLoader solo puede ejecutarse en el cliente'))
    }

    if (window.matrix) {
      return Promise.resolve(window.matrix)
    }

    if (MatrixLibraryLoader.loadPromise) {
      return MatrixLibraryLoader.loadPromise
    }

    MatrixLibraryLoader.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/cmatrix'
      script.async = true
      script.onload = () => resolve(window.matrix)
      script.onerror = () => {
        MatrixLibraryLoader.loadPromise = null
        reject(new Error('No se pudo cargar cmatrix'))
      }
      document.head.appendChild(script)
    })

    return MatrixLibraryLoader.loadPromise
  }
}
