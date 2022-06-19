function createLocalStorage () {
  const LocalStorage = require('node-localstorage').LocalStorage
  const localStorage = new LocalStorage('./temp/localStorage')
  return localStorage
}

module.exports = (typeof window !== 'undefined') ? window.localStorage : createLocalStorage()
