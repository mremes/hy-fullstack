
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LoggedInHeader = (props) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    props.logout()
  }

  return (
    <div>
      <p>Logged in as {props.user.name}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

const ConnectedLoggedInHeader = connect(mapStateToProps, mapDispatchToProps)(LoggedInHeader)

export default ConnectedLoggedInHeader