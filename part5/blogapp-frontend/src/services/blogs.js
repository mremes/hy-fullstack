
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const authHeader = () => { return { headers: { Authorization: token } } }
const setToken = (newToken) => token = `bearer ${newToken}`

const getAll = async () => await axios.get(baseUrl)
const createBlog = async (entry) => await axios.post(baseUrl, entry, authHeader())
const updateBlog = async (entry, id) => await axios.put(`${baseUrl}/${id}`, entry, authHeader())
const deleteBlog = async (id) => await axios.delete(`${baseUrl}/${id}`, authHeader())

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }