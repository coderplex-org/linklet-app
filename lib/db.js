import axios from 'axios'

let baseUrl

if (typeof window === 'undefined') {
  baseUrl = 'https://api.links.linklet.ml/api'
} else if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://cors.linklet.ml/api'
} else {
  baseUrl = '/api'
}

const getAll = ({ page = 1 } = {}) => {
  return axios.get(`${baseUrl}/links/all/?page=${page}`)
}

const getByFilter = ({ start, end, page = 1 } = {}) => {
  const url = start && end
    ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}`
    : `${baseUrl}/links/filter/?page=${page}`
  return axios.get(url)
}

export default {
  getAll,
  getByFilter,
  baseUrl
}
