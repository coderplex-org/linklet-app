/* global location */
import db from '../lib/db'
import cookie from 'react-cookie'
import axios from 'axios'

export function login () {
  const href = `${db.baseUrl}/login/github?appRedirectUrl=${encodeURIComponent(location.href)}`
  location.href = href
}

export function logout () {
  const loginToken = cookie.load('loginToken')
  const camebackUrl = `${location.href}?logout=1`
  // It's important to send the loginToken since that's the way
  // how we say our auth server to logout the user
  const href = `${db.baseUrl}/logout?loginToken=${loginToken}&appRedirectUrl=${encodeURIComponent(camebackUrl)}`
  window.localStorage.removeItem('sharedState')
  window.localStorage.setItem('logout', Date.now())
  location.href = href
}

const fetchUser = async loginToken => {
  try {
    const result = await axios.get(`${db.baseUrl}/users/me`, {
      headers: {
        'x-auth': loginToken
      }
    })
    return result.data
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function loadUser ({ req, res }) {
  try {
    const loginToken = cookie.load('loginToken')
    if (!req) {
      // client side
      if (loginToken) {
        const localUser = JSON.parse(
          window.localStorage.getItem('sharedState')
        )
        if (localUser && loadUser._id) {
          return {
            user: localUser,
            isAuthenticated: true,
            fetchedFrom: 'LOCAL'
          }
        } else {
          // fetch user from api using loginToken
          const user = await fetchUser(loginToken)
          window.localStorage.setItem('sharedState', JSON.stringify(user))
          return {
            user,
            isAuthenticated: true,
            fetchedFrom: 'CLIENT_API'
          }
        }
      }
    } else {
      // server side
      const loginToken = req.cookies && req.cookies.loginToken
      if (loginToken) {
        const user = await fetchUser(loginToken)
        return {
          user,
          isAuthenticated: true,
          fetchedFrom: 'SERVER_API'
        }
      }
    }
  } catch (e) {
    return Promise.reject(e)
  }
}
