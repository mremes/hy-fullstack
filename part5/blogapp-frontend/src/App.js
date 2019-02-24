import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, handler, className }) => {
  if (message === '') {
    return null
  }

  setTimeout(() => handler(''), 3000)

  return (
    <div className={className}>
      {message}
    </div>
  )
}

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const cachedUser = JSON.parse(window.localStorage.getItem('user'))
    setUser(cachedUser)
    blogService.setToken(cachedUser.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl })
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage('blogi luotiin onnistuneesti')
    } catch (error) {
      setErrorMessage(`virhe blogin luonnissa: ${error.message}`)
    }
  }

  if (user) {
    return (
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={handleLogout}>logout</button>
        <Notification message={errorMessage} handler={setErrorMessage} className="error" />
        <Notification message={successMessage} handler={setSuccessMessage} className="success" />
        <h2>create new</h2>
        <div>
          <form onSubmit={handleNewBlog}>
            <div>title: <input type="text" name="newBlogTitle" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} /></div>
            <div>author: <input type="text" name="newBlogAuthor" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} /></div>
            <div>url: <input type="text" name="newBlogUrl" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} /></div>
            <button type="submit">create</button>
          </form>
        </div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} handler={setErrorMessage} className="error" />
      <Notification message={successMessage} handler={setSuccessMessage} className="success" />
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default App