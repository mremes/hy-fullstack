import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, handler }) => {
  return (
    <div>
      <form onSubmit={handler}>
        <div>title: <input type={title.type} name='title' value={title.value} onChange={title.onChange} /></div>
        <div>author: <input type={author.type} name='author' value={author.value} onChange={author.onChange} /></div>
        <div>url: <input type={url.type} name='url' value={url.value} onChange={url.onChange} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired
}

export default BlogForm