
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const authHeader = () => { return { headers: { Authorization: token } } }
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (entry) => {
  const response = await axios.post(baseUrl, entry, authHeader())
  return response.data
}

const updateBlog = async (entry, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, entry, authHeader())
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, authHeader())
  return response.status === 204
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }