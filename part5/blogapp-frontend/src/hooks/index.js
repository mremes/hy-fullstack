import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (url) => {
  const [token, setLocalToken] = useState('')
  const [resources, setResources] = useState([])

  const fetch = async () => {
    const response = await axios.get(url)
    setResources(response.data)
  }

  const set = (newVal) => {
    setResources(newVal)
  }

  const authHeader = () => { return { headers: { Authorization: token } } }

  const setToken = (newToken) => {
    setLocalToken(`bearer ${newToken}`)
  }

  const create = async (entry) => {
    console.log(entry)
    console.log(token)
    const response = await axios.post(url, entry, authHeader())
    return response.data
  }

  const update = async (entry, id) => {
    const response = await axios.put(`${url}/${id}`, entry, authHeader())
    return response.data
  }

  const deleteFn = async (id) => {
    const response = await axios.delete(`${url}/${id}`, authHeader())
    return response.status === 204
  }

  return [resources, {
    set,
    setToken,
    fetch,
    create,
    update,
    delete: deleteFn
  }]
}

export default { useField, useResource }