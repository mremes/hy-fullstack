import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogList = (props) => {
  const blogs = props.blogList || props.blogs
  if (!blogs) return null

  return (
    <div>
      <h2>blogs</h2>
      <ListGroup>
        {blogs.length > 0 ? blogs.map(blog => (
          <ListGroup.Item action key={blog.id}>
            <Link style={{ textDecoration: 'none' }} to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        )
        ) : <p>There are no blogs.</p>}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login
  }
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList
