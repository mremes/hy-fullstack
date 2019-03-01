import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (doc) => {
  const object = asObject(doc)
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, create }