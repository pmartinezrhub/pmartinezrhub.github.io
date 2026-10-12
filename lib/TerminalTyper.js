export default class TerminalTyper {
  #script
  #options
  #listener = null
  #timerId = null
  #running = false
  #history = []
  #prompt

  constructor(script, options = {}) {
    this.#script = script
    this.#options = {
      typeDelay: 70,
      jitter: 60,
      outputDelay: 350,
      lineDelay: 0,
      pauseBetween: 1400,
      maxHistory: 4,
      loop: true,
      prompt: { user: 'pablo', separator: '☠', host: 'hack', suffix: ':~$' },
      ...options
    }
    this.#prompt = this.#options.prompt
  }

  subscribe(listener) {
    this.#listener = listener
  }

  start() {
    if (this.#running) return
    this.#running = true
    this.#run()
  }

  stop() {
    this.#running = false
    clearTimeout(this.#timerId)
    this.#timerId = null
  }

  async #run() {
    do {
      for (const step of this.#script) {
        await this.#type(step.command)
        await this.#wait(this.#options.outputDelay)
        await this.#commit(step)
        await this.#wait(this.#options.pauseBetween)
      }
      this.#reset()
    } while (this.#options.loop)
  }

  async #type(command) {
    const { typeDelay, jitter } = this.#options
    for (let i = 1; i <= command.length; i++) {
      this.#emit(command.slice(0, i))
      await this.#wait(typeDelay + Math.random() * jitter)
    }
  }

  async #commit(step) {
    const lines = [].concat(step.output ?? [])
    const lineDelay = step.lineDelay ?? this.#options.lineDelay
    const entry = { ...step, prompt: this.#prompt, output: [] }

    this.#history = [...this.#history, entry].slice(-this.#options.maxHistory)
    if (step.nextPrompt) this.#prompt = step.nextPrompt
    this.#emit('')

    for (const line of lines) {
      if (lineDelay > 0) await this.#wait(lineDelay * (0.5 + Math.random()))
      this.#appendLine(line)
      this.#emit('')
    }
  }

  #appendLine(line) {
    const last = this.#history.at(-1)
    this.#history = [
      ...this.#history.slice(0, -1),
      { ...last, output: [...last.output, line] }
    ]
  }

  #reset() {
    this.#history = []
    this.#prompt = this.#options.prompt
    this.#emit('')
  }

  #emit(typing) {
    this.#listener?.({ history: this.#history, typing, prompt: this.#prompt })
  }

  #wait(ms) {
    return new Promise((resolve) => {
      this.#timerId = setTimeout(resolve, ms)
    })
  }
}
