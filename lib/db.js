import axios from 'axios'
import cookie from 'react-cookie'

let baseUrl

if (!process.browser) {
  baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : 'http://172.17.0.5:5000/api'
} else {
  baseUrl = 'https://api.linklet.ml/api'
}

const getAll = ({ page = 1, search, myLinks, req, bookmarks, sort } = {}) => {
  let loginToken = cookie.load('loginToken')
  if (!loginToken) {
    loginToken = req && req.cookies && req.cookies.loginToken
  }
  console.log('loginToken', loginToken)
  console.log('myLinks', myLinks)
  let url
  if (myLinks) {
    url = search
      ? `${baseUrl}/links/me/all/?page=${page}&search=${search}&sort=${sort}`
      : `${baseUrl}/links/me/all/?page=${page}&sort=${sort}`
  } else if (bookmarks) {
    url = search
      ? `${baseUrl}/bookmarks/me/all/?page=${page}&search=${search}&sort=${sort}`
      : `${baseUrl}/bookmarks/me/all/?page=${page}&sort=${sort}`
  } else {
    url = search
      ? `${baseUrl}/links/all/?page=${page}&search=${search}&sort=${sort}`
      : `${baseUrl}/links/all/?page=${page}&sort=${sort}`
  }
  console.log(url)
  return axios.get(url, {
    headers: {
      'x-auth': loginToken || ''
    }
  })
}

const getByFilter = (
  { start, end, page = 1, search, myLinks, req, bookmarks, sort } = {}
) => {
  let loginToken = cookie.load('loginToken')
  if (!loginToken) {
    loginToken = req && req.cookies && req.cookies.loginToken
  }
  let url
  if (myLinks) {
    url = start && end && search
      ? `${baseUrl}/links/me/filter/?page=${page}&start=${start}&end=${end}&search=${search}&sort=${sort}`
      : start && end
        ? `${baseUrl}/links/me/filter/?page=${page}&start=${start}&end=${end}&sort=${sort}`
        : `${baseUrl}/links/me/filter/?page=${page}&sort=${sort}`
  } else if (bookmarks) {
    url = start && end && search
      ? `${baseUrl}/bookmarks/me/filter/?page=${page}&start=${start}&end=${end}&search=${search}&sort=${sort}`
      : start && end
        ? `${baseUrl}/bookmarks/me/filter/?page=${page}&start=${start}&end=${end}&sort=${sort}`
        : `${baseUrl}/bookmarks/me/filter/?page=${page}&sort=${sort}`
  } else {
    url = start && end && search
      ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}&search=${search}&sort=${sort}`
      : start && end
        ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}&sort=${sort}`
        : `${baseUrl}/links/filter/?page=${page}&sort=${sort}`
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

const incrementView = id => {
  const loginToken = cookie.load('loginToken')
  console.log(loginToken)
  const url = `${baseUrl}/links/${id}/views`
  return axios.patch(
    url,
    {},
    {
      headers: {
        'x-auth': loginToken
      }
    }
  )
}

const likeLink = id => {
  const loginToken = cookie.load('loginToken')
  console.log(loginToken)
  const url = `${baseUrl}/links/${id}/bookmark`
  return axios.patch(
    url,
    {},
    {
      headers: {
        'x-auth': loginToken
      }
    }
  )
}

export default {
  getAll,
  getByFilter,
  getMetaData,
  saveLink,
  baseUrl,
  incrementView,
  likeLink
}
