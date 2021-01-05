// import Cookies from 'js-cookie'

const TokenKey = 'supermarket_token'

const storage = window.localStorage

export function getToken() {
  if (storage) {
    return storage.getItem(TokenKey)
  } else {
    return ''
  }
}

export function setToken(token) {
  if (storage) {
    return storage.setItem(TokenKey, token)
  } else {
    return null
  }
}

export function removeToken() {
  if (storage) {
    return storage.removeItem(TokenKey)
  } else {
    return null
  }
}
