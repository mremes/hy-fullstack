import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => await axios.get(baseUrl)

export default { getAll }