const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')
const wrapper = require('../wrapper')
const User = require('../../models/user')

const api = wrapper(supertest(app), '/api/users')

const entry = (name, username, password) => {
  return { name, username, password }
}
const users = [
  entry('Tess The Tester', 'ttester', '12345'),
  entry('Masa Mainio', 'mazaaaaaaa', '12345'),
  entry('Donald', 'thereald0nald', 'yo'),
  entry('Donald', 'yo', 'thereald0nald'),
  entry('Donald', 'yo', 'th')
]

beforeEach(async () => {
  await User.remove({})
  const obj = new User(users[0])
  await obj.save()
})


const post_json = (doc) => {
  return api.post(doc)
    .expect('Content-Type', /application\/json/)
}


describe(`GET ${api.rootEndpoint}`, async () => {
  test('correct number of user entries is returned', async () => {
    const response = await api.get()
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})


describe(`POST ${api.rootEndpoint}`, async () => {
  test('test that document gets saved', async () => {
    let response = await api.get()
    expect(response.body.map(m => m.username)).not.toContain(users[1].username)
    await post_json(users[1]).expect(201)
    response = await api.get()
    expect(response.body.map(m => m.username)).toContain(users[1].username)
  })

  test('value validation works', async () => {
    const promises = users.slice(2, 5).map(m => post_json(m).expect(400))
    await Promise.all(promises)
  })
})

afterAll(async () => {
  await User.remove({})
  mongoose.connection.close()
})

