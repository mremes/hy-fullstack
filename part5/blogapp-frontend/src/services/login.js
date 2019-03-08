import axios from 'axios'

const baseUrl = '/api/login'

const login = async (data) => await axios.post(baseUrl, data)

export default { login }