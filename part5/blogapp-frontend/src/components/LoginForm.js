import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import { login, logout } from '../reducers/loginReducer'


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
      <Form inline onSubmit={handleLogin}>
        <Form.Control
          type={username.type}
          value={username.value}
          name='Username'
          placeholder='username'
          onChange={username.onChange}
        />
        <Form.Control
          type={password.type}
          value={password.value}
          name='Password'
          placeholder='password'
          onChange={password.onChange}
        />
        <Button type='submit'>log in</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login
  }
}

const mapDispatchToProps = {
  login,
  logout
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default ConnectedLoginForm