import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = (props) => {
  const blogs = props.blogs
  const user = props.user

  const handleLike = async (event) => {
    event.preventDefault()
    props.likeBlog(event.target.id)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    event.persist()
    const id = event.target.id

    const confirm = window.confirm(`Are you sure to delete blog id ${id}?`)
    if (!confirm) return

    props.deleteBlog(id)
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} isOwner={blog.user.username === (user || {}).username} likeHandler={handleLike} deleteHandler={handleDelete} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  deleteBlog,
  likeBlog
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogList
