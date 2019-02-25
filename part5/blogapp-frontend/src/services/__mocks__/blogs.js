const blogs = [{
  id: 1,
  title: 'testing is important',
  author: 'Foo Bar',
  url: 'http://foo.bar/1',
  likes: 1,
  user: {
    id: 1,
    name: 'Tessa Testaaja',
    username: 'ttestaaja'
  }
}, {
  id: 2,
  title: 'testing is very important',
  author: 'Foo Berr',
  likes: 9001,
  url: 'http://foo.bar/2',
  user: {
    id: 1,
    name: 'Tessa Testaaja',
    username: 'ttestaaja'
  }
}]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = token => console.log(token)

export default { getAll, setToken }