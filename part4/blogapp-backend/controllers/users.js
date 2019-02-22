const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


const minLengthError = (label, val) => {
  return { error: `${label} must be more than ${val} characters long` }
}

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const existing = await User.findOne({ username: body.username })
    let len = 3
    if (existing)
      return response.status(400).json({ error: 'a user with the given username already exists' })
    if (request.body.password.length < len)
      return response.status(400).json(minLengthError('password', len))
    if (request.body.username.length < len)
      return response.status(400).json(minLengthError('username', len))

    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { likes: 1, title: 1, url: 1, author: 1 })
  response.status(200).json(users.map(u => u.toJSON()))
})

module.exports = usersRouter