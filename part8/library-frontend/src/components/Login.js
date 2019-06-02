import React, { useState, useEffect } from 'react'

const LoginForm = ({ login, token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    let cached = localStorage.getItem('user')

    if (cached) {
      cached = JSON.parse(cached)
      setUsername(cached.username)
      setToken(cached.token)
    }
  }, [])

  const submit = async (event) => {
    event.preventDefault()

    try {
      const result = await login({ variables: { username, password } })
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user', JSON.stringify({ username, token }))
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  const logout = async (event) => {
    event.preventDefault()
    setToken('')
    setUsername('')
    localStorage.removeItem('user')
  }

  if (!token) {
    return (
      <div>
        <form onSubmit={submit}>
          <div>
            username <input value={username} onChange={({ target }) => setUsername(target.value)} />
            password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
            <button type='submit'>login</button>
          </div>
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