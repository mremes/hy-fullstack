import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Form, Button, FormGroup } from 'react-bootstrap'
import { useField } from '../hooks'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'

const Blog = (props) => {
  const comment = useField('text')

  const blog = props.blogs.find(b => b.id === props.blogId)
  const user = props.user

  if (!blog || !user) return null
  const isOwner = blog.user.username === (user || {}).username

  const likeHandler = async (event) => {
    event.preventDefault()
    props.likeBlog(event.target.id)
  }

  const deleteHandler = async (event) => {
    event.preventDefault()
    event.persist()
    const id = event.target.id
    if (!window.confirm(`Are you sure to delete blog id ${id}?`)) return
    props.deleteBlog(id)
  }

  const handleComment = async (event) => {
    event.preventDefault()
    console.log(event.target.id)
    if (comment.value.length === 0) return
    props.addComment(event.target.id, comment.value)
    comment.reset()
  }

  return (
    <div>
      <div>
        <h2>{blog.title} – {blog.author}</h2>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a><br />
        {blog.likes} likes <Button id={blog.id} onClick={likeHandler}>like</Button><br />
        {isOwner ? <div><Button id={blog.id} onClick={deleteHandler}>delete</Button> <br /></div> : null}
        added by {blog.user.name}
        <h3>comments</h3>
        <Form inline onSubmit={handleComment} id={blog.id}>
          <FormGroup>
            <Form.Control type={comment.type} name='comment' value={comment.value} onChange={comment.onChange} />
          </FormGroup>
          <Button type='submit'>add comment</Button>
        </Form>
        {blog.comments.length > 0 ?
          <ListGroup>
            {blog.comments.map(c => (
              <ListGroup.Item key={c}>{c}</ListGroup.Item>
            ))}
          </ListGroup>
          : <p>this blog has no comments</p>}

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login
  }
}

const mapDispatchToProps = {
  deleteBlog,
  likeBlog,
  addComment
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog