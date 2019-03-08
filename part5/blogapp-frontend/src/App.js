import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Menu from './components/Menu'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/loginReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
    const cachedUser = JSON.parse(window.localStorage.getItem('user'))
    if (cachedUser) {
      props.setUser(cachedUser)
    }
  }, [])

  const wrapWithHeader = (content) => (
    <div>
      <Menu />
      <Notification />
      {props.user ? content : null}
    </div>
  )

  const mainContent = () => (
    <div>
      <BlogForm />
      <BlogList />
    </div>
  )

  return (
    <Container>
      <Router>
        <div>
          <Route exact path='/' render={() => wrapWithHeader(mainContent())} />
          <Route exact path='/blogs' render={() => wrapWithHeader(<BlogList />)} />
          <Route exact path='/users' render={() => wrapWithHeader(<Users />)} />
          <Route exact path='/users/:id' render={({ match }) => wrapWithHeader(<User userId={match.params.id} />)} />
          <Route exact path='/blogs/:id' render={({ match }) => wrapWithHeader(<Blog blogId={match.params.id} />)} />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)