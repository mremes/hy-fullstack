import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInHeader from './components/LoggedInHeader'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'


const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    const cachedUser = JSON.parse(window.localStorage.getItem('user'))
    if (cachedUser) {
      props.setUser(cachedUser)
    }
  }, [])

  const loginForm = () => (
    <div>
      <LoginForm />
    </div>
  )

  const mainContent = () => (
    <div>
      <LoggedInHeader />
      <BlogForm />
      <BlogList />
    </div>
  )

  return (
    <div>
      <Notification />
      {props.user ? mainContent() : loginForm()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)