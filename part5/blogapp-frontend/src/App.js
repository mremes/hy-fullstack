import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const updateBlogList = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
        username, password,
      })

      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
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

    const blog = blogs.find(e => e.id == event.target.id)
    try {
      const newBlog = {
        user: blog.user,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1
      }

      const response = await blogService.updateBlog(newBlog, blog.id)
      setBlogs(blogs.map(e => e.id != blog.id ? e : response).sort((a, b) => b.likes - a.likes))
    } catch (error) {
      setErrorMessage('error while liking')
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    event.persist()

    const blog = blogs.find(e => e.id == event.target.id)
    const confirm = window.confirm(`Are you sure to delete blog entry ${blog.title} by ${blog.author}?`)
    if (!confirm) return

    try {
      const deleted = await blogService.deleteBlog(event.target.id)
      if (deleted) {
        setBlogs(blogs.filter(e => e.id != event.target.id))
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
      let newBlog = await blogService.createBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl })
      newBlog = { ...newBlog, user: { username: user.username } }
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage('blog entry successfully created')
    } catch (error) {
      setErrorMessage(`error while creating blog entry: ${error.message}`)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='log in'>
          <LoginForm handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            username={username}
            password={password} />
        </Togglable>
      </div>
    )
  }

  const showLoginInfo = () => {
    return (
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} handler={setErrorMessage} className='error' />
      <Notification message={successMessage} handler={setSuccessMessage} className='success' />
      {user ? showLoginInfo() : loginForm()}
      <h2>create new</h2>
      <div>
        <form onSubmit={handleNewBlog}>
          <div>title: <input type='text' name='newBlogTitle' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} /></div>
          <div>author: <input type='text' name='newBlogAuthor' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} /></div>
          <div>url: <input type='text' name='newBlogUrl' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} /></div>
          <button type='submit'>create</button>
        </form>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} isOwner={blog.user.username == (user || {}).username} likeHandler={handleLike} deleteHandler={handleDelete} />)}
    </div>
  )
}

export default App