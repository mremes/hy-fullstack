const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')

const { documentToPost, manyEntries } = require('./helpers')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const promises = manyEntries.map(e => new Blog(e)).map(e => e.save())
  await Promise.all(promises)
})

const rootEndpoint = '/api/blogs'
const GET_blogs = () => api.get(rootEndpoint)
const POST_blogs = (doc) => api.post(rootEndpoint).send(doc)
const DELETE_blogs = (id) => api.delete(`${rootEndpoint}/${id}`)
const PUT_blogs = (doc) => api.put(`${rootEndpoint}`).send(doc)

describe(`GET ${rootEndpoint}`, async () => {
  test('collection of blogs is returned as json', async () => {
    await GET_blogs()
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blog entries is returned', async () => {
    const response = await GET_blogs()
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(4)
  })

  test('each entry has "id" key within document', async () => {
    const response = await GET_blogs()
    response.body.map(e => expect(e.id).toBeDefined())
  })
})

describe(`POST ${rootEndpoint}`, async () => {
  test('post increases count by one', async () => {
    let response = await GET_blogs()
    const responseLength = response.body.length

    await POST_blogs(documentToPost).expect(201)

    response = await GET_blogs()
    expect(response.body.length).toBe(responseLength + 1)
  })

  test('added document is found from the colletion', async () => {
    await POST_blogs(documentToPost)

    let response = await GET_blogs()
    expect(response.body.map(e => e.title)).toContain('TDD harms architecture')
  })

  test('document without likes has 0 likes', async () => {
    const document = Object.assign({}, documentToPost)
    delete document.likes

    const response = await POST_blogs(document)

    expect(response.body.likes).toBe(0)
  })

  test('bad request if document is without tile and url', async () => {
    const document = Object.assign({}, documentToPost)
    delete document.title
    delete document.url

    await POST_blogs(document).expect(400)
  })
})

describe(`DELETE ${rootEndpoint}`, async () => {
  test('Existing document gets deleted', async () => {
    const targetTitle = 'React patterns'

    let blogs = await GET_blogs(documentToPost)
    expect(blogs.body.map(e => e.title)).toContain(targetTitle)
    const targetEntry = blogs.body.find(e => e.title == targetTitle)

    await DELETE_blogs(targetEntry.id).expect(204)

    blogs = await GET_blogs(documentToPost)
    expect(blogs.body.map(e => e.title)).not.toContain(targetTitle)
  })
})

describe(`PUT ${rootEndpoint}`, async () => {
  test(`Existing document's fields get updated, 
        and assert that some fields are immutable`, async () => {
    const targetTitle = 'React patterns'
    const newUrl = 'http://localhost:3000/react_blog_post'
    const newAuthor = 'I\'M IMMUTABLE'

    let blogs = await GET_blogs(documentToPost)
    expect(blogs.body.map(e => e.title)).toContain(targetTitle)
    const targetEntry = blogs.body.find(e => e.title == targetTitle)

    targetEntry.likes += 1
    targetEntry.url = newUrl
    const oldAuthor = targetEntry.author
    targetEntry.author = newAuthor
    await PUT_blogs(targetEntry).expect(200)

    blogs = await GET_blogs(documentToPost)
    const newEntry = blogs.body.find(e => e.title == targetTitle)
    expect(newEntry.likes).toBe(targetEntry.likes)
    expect(newEntry.url).toBe(newUrl)
    expect(newEntry.author).toBe(oldAuthor)
  })
})

afterAll(() => {
  mongoose.connection.close()
})