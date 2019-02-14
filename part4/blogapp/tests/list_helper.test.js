const listHelper = require('../utils/list_helper')

describe('dummy tests', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogsWithZeroLikes = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 0,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  }
]

const emptyBlogList = []

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list contains only blogs with 0 likes, function returns 0', () => {
    const result = listHelper.totalLikes(blogsWithZeroLikes)
    expect(result).toBe(0)
  })

  test('when list contains arbitrary elements, a correct sum is returned', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(34)
  })

  test('when list is empty, 0 is returned', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('favorite blog gets returned from the array of blogs', () => {

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(blogs[2])
  })

  test('given empty list function returns undefined', () => {

    const result = listHelper.favoriteBlog(emptyBlogList)
    expect(result).toBe(undefined)
  })
})

describe('author with most blogs', () => {
  test('the right author gets selected from the array of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })

  test('given empty list function returns undefined', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    expect(result).toEqual(undefined)
  })
})

describe('author with most likes', () => {
  test('the right author gets selected from the array of blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('given empty list function returns undefined', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    expect(result).toEqual(undefined)
  })
})