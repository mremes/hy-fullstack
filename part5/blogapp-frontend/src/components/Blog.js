import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, isOwner, likeHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false)

  const defaultStyle = { display: visible ? 'none' : '' }
  const expandedStyle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const titleStyle = {
    cursor: 'pointer'
  }

  return (
    <div style={blogStyle} className='reducedContent'>
      <div style={defaultStyle}>
        <b onClick={toggleVisibility} style={{ ...titleStyle, display: 'inline' }}>{blog.title}</b> {blog.author}
      </div>
      <div style={expandedStyle} className='fullContent'>
        <b onClick={toggleVisibility} style={titleStyle}>{blog.title}</b><br />
        <i>{blog.author}</i><br />
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a><br />
        {blog.likes} likes <button id={blog.id} onClick={likeHandler}>like</button><br />
        <button style={{ display: isOwner ? '' : 'none' }} id={blog.id} onClick={deleteHandler}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default Blog