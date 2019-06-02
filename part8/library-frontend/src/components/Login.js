import React, { useState, useEffect } from 'react'
import { setUserStorage, getUserStorage, resetUserStorage } from '../utils'

const LoginForm = ({ client, login, token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const cached = getUserStorage()
    setUsername(cached.username)
    setToken(cached.token)
  }, [])

const submit = async (event) => {
  event.preventDefault()
  try {
    const result = await login({ variables: { username, password } })
    const token = result.data.login.value
    setToken(token)
    setUserStorage({ username, token })
    setPassword('')
  } catch (err) {
    console.log(err)
  }
}

const logout = async (event) => {
  event.preventDefault()
  setToken('')
  setUsername('')
  resetUserStorage()
  client.resetStore()
}

if (!token) {
  return (
    <div>
      <form onSubmit={submit}>
          username <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
          password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          <button type='submit'>login</button>
      </form>
    </div>
  )
}
return (
  <div>
    <form onSubmit={logout}>logged in as '{username}' <button type='submit'>logout</button></form>
  </div>
)
}

export default LoginForm