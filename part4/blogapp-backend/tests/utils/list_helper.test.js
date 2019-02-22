const listHelper = require('../../utils/list_helper')
const { with1Entry, with0Likes, manyEntries, empty } = require('../helpers')

describe('dummy tests', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(empty)
    expect(result).toBe(1)
  })
})


describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(with1Entry)
    expect(result).toBe(5)
  })

  test('when list contains only blogs with 0 likes, function returns 0', () => {
    const result = listHelper.totalLikes(with0Likes)
    expect(result).toBe(0)
  })

  test('when list contains arbitrary elements, a correct sum is returned', () => {
    const result = listHelper.totalLikes(manyEntries)
    expect(result).toBe(34)
  })

  test('when list is empty, 0 is returned', () => {
    const result = listHelper.totalLikes(empty)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('favorite blog gets returned from the array of blogs', () => {

    const result = listHelper.favoriteBlog(manyEntries)
    expect(result).toBe(manyEntries[2])
  })

  test('given empty list function returns undefined', () => {

    const result = listHelper.favoriteBlog(empty)
    expect(result).toBe(undefined)
  })
})

describe('author with most blogs', () => {
  test('the right author gets selected from the array of blogs', () => {
    const result = listHelper.mostBlogs(manyEntries)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })

  test('given empty list function returns undefined', () => {
    const result = listHelper.mostBlogs(empty)
    expect(result).toEqual(undefined)
  })
})

describe('author with most likes', () => {
  test('the right author gets selected from the array of blogs', () => {
    const result = listHelper.mostLikes(manyEntries)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('given empty list function returns undefined', () => {
    const result = listHelper.mostLikes(empty)
    expect(result).toEqual(undefined)
  })
})