import axios from 'axios'
import cookie from 'react-cookie'

let baseUrl

if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  baseUrl = process.env.API_URL
} else if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://cors.linklet.ml/api'
} else {
  baseUrl = '/api'
}

const getAll = ({ page = 1, search, myLinks, req } = {}) => {
  let loginToken = cookie.load('loginToken')
  if (!loginToken) {
    loginToken = req && req.cookies && req.cookies.loginToken
  }
  console.log('loginToken', loginToken)
  console.log('myLinks', myLinks)
  let url
  if (myLinks) {
    url = search
      ? `${baseUrl}/links/me/all/?page=${page}&search=${search}`
      : `${baseUrl}/links/me/all/?page=${page}`
  } else {
    url = search
      ? `${baseUrl}/links/all/?page=${page}&search=${search}`
      : `${baseUrl}/links/all/?page=${page}`
  }
  console.log(url)
  return axios.get(url, {
    headers: {
      'x-auth': loginToken || ''
    }
  })
}

const getByFilter = ({ start, end, page = 1, search, myLinks, req } = {}) => {
  let loginToken = cookie.load('loginToken')
  if (!loginToken) {
    loginToken = req && req.cookies && req.cookies.loginToken
  }
  let url
  if (myLinks) {
    url = start && end && search
      ? `${baseUrl}/links/me/filter/?page=${page}&start=${start}&end=${end}&search=${search}`
      : start && end
          ? `${baseUrl}/links/me/filter/?page=${page}&start=${start}&end=${end}`
          : `${baseUrl}/links/me/filter/?page=${page}`
  } else {
    url = start && end && search
      ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}&search=${search}`
      : start && end
          ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}`
          : `${baseUrl}/links/filter/?page=${page}`
  }

  return axios.get(url, {
    headers: {
      'x-auth': loginToken || ''
    }
  })
}

const getMetaData = link => {
  const url = `${baseUrl}/metadata?url=${link}`
  return axios.get(url)
}

const saveLink = data => {
  const loginToken = cookie.load('loginToken')
  const url = `${baseUrl}/links`
  return axios.post(url, data, {
    headers: {
      'x-auth': loginToken
    }
  })
}

export default {
  getAll,
  getByFilter,
  getMetaData,
  saveLink,
  baseUrl
}
