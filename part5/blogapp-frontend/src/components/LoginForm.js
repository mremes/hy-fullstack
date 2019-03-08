import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import Togglable from './Togglable'
import { login, logout } from '../reducers/userReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username.value, password.value)
    window.localStorage.setItem('user', JSON.stringify(props.user))
    username.reset()
    password.reset()
  }

  return (
    <div>
      <Togglable buttonLabel='log in'>
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type={username.type}
                value={username.value}
                name='Username'
                onChange={username.onChange}
              />
            </div>
            <div>
              password
              <input
                type={password.type}
                value={password.value}
                name='Password'
                onChange={password.onChange}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login,
  logout
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm