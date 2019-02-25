import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => {
  return (
    <div>
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
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm