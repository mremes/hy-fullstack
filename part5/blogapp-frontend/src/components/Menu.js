import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoggedInHeader from './LoggedInHeader'
import LoginForm from './LoginForm'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = (props) => {
  const padding = { textDecoration: 'none' }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand>Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/'>home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/blogs'>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/users'>users</Link>
          </Nav.Link>
        </Nav>
        {props.user ? <LoggedInHeader /> : <LoginForm />}
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login
  }
}

export default connect(mapStateToProps)(Menu)