import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { newBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    props.newBlog({ title: title.value, author: author.value, url: url.value })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type={title.type} name='title' value={title.value} onChange={title.onChange} />
          <Form.Label>author</Form.Label>
          <Form.Control type={author.type} name='author' value={author.value} onChange={author.onChange} />
          <Form.Label>url</Form.Label>
          <Form.Control type={url.type} name='url' value={url.value} onChange={url.onChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>create</Button>
      </Form>
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