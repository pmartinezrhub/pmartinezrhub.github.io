export default class MatrixController {
  constructor() {
    this.instance = null
    this.canvas = null
  }

  start(canvas, options) {
    if (!canvas || !window.matrix) {
      console.warn('Canvas o librería matrix no disponibles')
      return
    }

    this.canvas = canvas
    
    // Limpiar canvas completamente antes de empezar
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.resetTransform()
    }

    window.matrix(canvas, {
      ...options,
      mount: (matrix) => {
        this.instance = matrix
        matrix.start()
        console.log('Matrix animation started')
      }
    })
  }

  stop() {
    if (this.instance) {
      console.log('Matrix animation stopping')
      try {
        this.instance.stop()
        this.instance.clear()
      } catch (error) {
        console.error('Error stopping matrix:', error)
      }
      this.instance = null
    }
    
    // Limpiar canvas si existe
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
      this.canvas = null
    }
  }
}