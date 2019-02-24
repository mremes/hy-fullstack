
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (entry) => {
  const request = axios.post(baseUrl, entry, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

export default { getAll, createBlog, setToken }