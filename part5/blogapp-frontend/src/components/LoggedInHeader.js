
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'
const LoggedInHeader = (props) => {
  const user = props.user
  if (!user) return null

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    props.logout()
  }

  return (
    <div style={{ float: 'right', paddingRight: 10 }}>
      Logged in as {user.name} <Button onClick={handleLogout}>logout</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login
  }
}

const mapDispatchToProps = {
  logout
}

const ConnectedLoggedInHeader = connect(mapStateToProps, mapDispatchToProps)(LoggedInHeader)

export default ConnectedLoggedInHeader