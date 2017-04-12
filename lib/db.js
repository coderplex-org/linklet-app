import axios from 'axios'

let baseUrl

if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  baseUrl = process.env.API_URL
} else if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://cors.linklet.ml/api'
} else {
  baseUrl = '/api'
}

const getAll = ({ page = 1, search } = {}) => {
  const url = search
    ? `${baseUrl}/links/all/?page=${page}&search=${search}`
    : `${baseUrl}/links/all/?page=${page}`
  return axios.get(url)
}

const getByFilter = ({ start, end, page = 1, search } = {}) => {
  const url = start && end && search
    ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}&search=${search}`
    : start && end
        ? `${baseUrl}/links/filter/?page=${page}&start=${start}&end=${end}`
        : `${baseUrl}/links/filter/?page=${page}`
  return axios.get(url)
}

export default {
  getAll,
  getByFilter,
  baseUrl
}
