import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { newBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const user = props.user

  const handleNewBlog = async (event) => {
    event.preventDefault()
    props.newBlog({ title: title.value, author: author.value, url: url.value }, user)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>title: <input type={title.type} name='title' value={title.value} onChange={title.onChange} /></div>
        <div>author: <input type={author.type} name='author' value={author.value} onChange={author.onChange} /></div>
        <div>url: <input type={url.type} name='url' value={url.value} onChange={url.onChange} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  newBlog
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm