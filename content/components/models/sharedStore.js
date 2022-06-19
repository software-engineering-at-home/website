const localStorageKey = 'vuesite-sharedStore-state'
const localStorage = require('./localStorage')

const store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessage (message) {
    this.state.message = message
    this.updateLocalStorage()
  },
  updateLocalStorage () {
    const { state } = this
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  },
  readFromLocalStorage () {
    try {
      const localState = JSON.parse(localStorage.getItem(localStorageKey))
      Object.assign(this.state, localState)
      console.log('[Shared Store] Loaded values:', this.state)
    } catch (ex) {
      // ignore error
    }
  }
}

module.exports = store
