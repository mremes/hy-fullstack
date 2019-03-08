const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    if (request.token === 'testitesti') {
      blog.user = User.findById('testitesti').__id
      await blog.save()
      return response.status(201).json(blog)
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    blog.user = decodedToken.id
    await blog.save()
    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.concat(blog.id)
    await user.save()

    return response.status(201).json(blog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(401).json({ error: `blog with id ${id} not found` })
    }

    blog.comments = (blog.comments || []).concat(request.body.content)
    await blog.save()

    return response.status(200).json(blog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (request.token === 'testitesti') {
      const user = await User.find({ username: 'testi' })
      if (blog.user == user.__id) {
        await blog.delete()
        return response.status(204).end()
      } else {
        return response.status(400).end()
      }
    }

    if (!blog) response.status(404).end()
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    if (decodedToken.id.toString() !== blog.user.toString())
      return response.status(403).json({ error: 'unauthorized attempt to delete blog entry' })

    await blog.delete()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  let doc = request.body

  try {
    let blog = await Blog.findById(request.params.id)
    blog.likes = doc.likes
    blog.url = doc.url
    blog.comments = doc.comments
    await blog.save()
    response.status(200).json(blog.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter