import React, { useState, useEffect } from 'react'
import { useField, useResource } from './hooks'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, blogService] = useResource('/api/blogs')
  const username = useField('text')
  const password = useField('password')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const updateBlogList = async () => {
    blogService.fetch()
  }

  useEffect(() => {
    updateBlogList()
  }, [])

  useEffect(() => {
    const cachedUser = JSON.parse(window.localStorage.getItem('user'))
    if (cachedUser) {
      setUser(cachedUser)
      blogService.setToken(cachedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      username.reset()
      password.reset()
    } catch (error) {
      setErrorMessage('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLike = async (event) => {
    event.preventDefault()

    const blog = blogs.find(e => e.id === event.target.id)
    try {
      const newBlog = {
        user: blog.user,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1
      }

      const response = await blogService.update(newBlog, blog.id)
      blogService.set(blogs.map(e => e.id !== blog.id ? e : response).sort((a, b) => b.likes - a.likes))
    } catch (error) {
      setErrorMessage('error while liking')
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    event.persist()

    const blog = blogs.find(e => e.id === event.target.id)
    const confirm = window.confirm(`Are you sure to delete blog entry ${blog.title} by ${blog.author}?`)
    if (!confirm) return

    try {
      const deleted = await blogService.delete(event.target.id)
      if (deleted) {
        blogService.set(blogs.filter(e => e.id !== event.target.id))
      } else {
        setErrorMessage('error while deleting')
      }
    } catch (error) {
      setErrorMessage(`error while deleting: ${error.message}`)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      let newBlog = await blogService.create({ title: title.value, author: author.value, url: url.value })
      newBlog = { ...newBlog, user: { username: user.username } }
      blogService.set(blogs.concat(newBlog))
      setSuccessMessage('blog entry successfully created')
      title.reset()
      author.reset()
      url.reset()
    } catch (error) {
      setErrorMessage(`error while creating blog entry: ${error.message}`)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='log in'>
          <LoginForm handleLogin={handleLogin}
            username={username}
            password={password} />
        </Togglable>
      </div>
    )
  }

  const mainContent = () => {
    return (
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <BlogForm title={title} author={author} url={url} handler={handleNewBlog} />
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} isOwner={blog.user.username === (user || {}).username} likeHandler={handleLike} deleteHandler={handleDelete} />)}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} handler={setErrorMessage} className='error' />
      <Notification message={successMessage} handler={setSuccessMessage} className='success' />
      {user ? mainContent() : loginForm()}
    </div>
  )
}

export default App