import cookie from 'react-cookies'
const storeUtils = {}

// cookie
storeUtils.getItem = function (key) {
  return cookie.load(key) || ''
}

storeUtils.setItem = function (key, value) {
  cookie.save(key, value)
}

storeUtils.removeItem = function (key) {
  cookie.remove(key)
}

// cookie
storeUtils.getCookie = function (key) {
  return cookie.load(key) || ''
}

storeUtils.setCookie = function (key, value) {
  cookie.save(key, value)
}

storeUtils.removeCookie = function (key) {
  cookie.remove(key)
}

// storage
storeUtils.getStore = function (key) {
  if (typeof window !== 'undefined') {
    const data = window.sessionStorage.getItem(key)
    return JSON.parse(data)
  }
}

storeUtils.setStore = function (key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

storeUtils.removeStore = function (key) {
  window.sessionStorage.removeItem(key)
}

storeUtils.clearStore = function () {
  window.sessionStorage.clear()
}


export default storeUtils