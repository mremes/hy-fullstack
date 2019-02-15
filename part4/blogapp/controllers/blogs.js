const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    let blogs = await Blog.find({})
    response.json(blogs.map(b => b.toJSON()))
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    await blog.save()
    response.status(201).json(blog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/', async (request, response, next) => {
  let doc = request.body

  try {
    let blog = await Blog.findById(doc.id)
    blog.likes = doc.likes
    blog.url = doc.url
    await blog.save()
    response.status(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter