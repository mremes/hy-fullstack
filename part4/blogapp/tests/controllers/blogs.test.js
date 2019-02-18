const supertest = require('supertest')
const mongoose = require('mongoose')
const wrapper = require('../wrapper')
const app = require('../../app')

const { documentToPost, manyEntries } = require('../helpers')
const Blog = require('../../models/blog')
const User = require('../../models/user')

beforeEach(async () => {
  let user = new User({ name: 'testi', username: 'testi', password: 'testi' })
  user = await user.save()
  await Blog.remove({})
  const promises = manyEntries.map(e => new Blog({ ...e, user: user.__id })).map(e => e.save())
  await Promise.all(promises)
})

const api = wrapper(supertest(app), '/api/blogs')

describe(`GET ${api.rootEndpoint}`, async () => {
  test('collection of blogs is returned as json', async () => {
    await api.get()
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blog entries is returned', async () => {
    const response = await api.get()
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(4)
  })

  test('each entry has "id" key within document', async () => {
    const response = await api.get()
    response.body.map(e => expect(e.id).toBeDefined())
  })
})

describe(`POST ${api.rootEndpoint}`, async () => {
  test('post increases count by one', async () => {
    let response = await api.get()
    const responseLength = response.body.length

    await api.post(documentToPost).expect(201)

    response = await api.get()
    expect(response.body.length).toBe(responseLength + 1)
  })

  test('added document is found from the colletion', async () => {
    await api.post(documentToPost)

    let response = await api.get()
    expect(response.body.map(e => e.title)).toContain('TDD harms architecture')
  })

  test('document without likes has 0 likes', async () => {
    const document = Object.assign({}, documentToPost)
    delete document.likes

    const response = await api.post(document)

    expect(response.body.likes).toBe(0)
  })

  test('bad request if document is without tile and url', async () => {
    const document = Object.assign({}, documentToPost)
    delete document.title
    delete document.url

    await api.post(document).expect(400)
  })
})

describe(`DELETE ${api.rootEndpoint}`, async () => {
  test('existing document gets deleted', async () => {
    const targetTitle = 'React patterns'

    let blogs = await api.get()
    expect(blogs.body.map(e => e.title)).toContain(targetTitle)
    const targetEntry = blogs.body.find(e => e.title == targetTitle)

    await api.delete(targetEntry.id).expect(204)

    blogs = await api.get(documentToPost)
    expect(blogs.body.map(e => e.title)).not.toContain(targetTitle)
  })
})

describe(`PUT ${api.rootEndpoint}`, async () => {
  test('existing document\'s fields get updated, and assert that some fields are immutable', async () => {
    const targetTitle = 'React patterns'
    const newUrl = 'http://localhost:3000/react_blog_post'
    const newAuthor = 'I\'M IMMUTABLE'

    let blogs = await api.get(documentToPost)
    expect(blogs.body.map(e => e.title)).toContain(targetTitle)
    const targetEntry = blogs.body.find(e => e.title == targetTitle)

    targetEntry.likes += 1
    targetEntry.url = newUrl
    const oldAuthor = targetEntry.author
    targetEntry.author = newAuthor
    await api.put(targetEntry).expect(200)

    blogs = await api.get(documentToPost)
    const newEntry = blogs.body.find(e => e.title == targetTitle)
    expect(newEntry.likes).toBe(targetEntry.likes)
    expect(newEntry.url).toBe(newUrl)
    expect(newEntry.author).toBe(oldAuthor)
  })
})

afterAll(() => {
  mongoose.connection.close()
})