const _ = require('lodash')

// eslint-disable-next-line
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, e) => acc + e.likes, 0)

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length == 0)
    return undefined
  return blogs.reduce((acc, e) => acc.likes < e.likes ? e : acc, { likes: -1 })
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length == 0)
    return undefined

  const hmap = _.groupBy(blogs, 'author')

  const result = Object.keys(hmap)
    .map(key => ({ author: key, numBlogs: hmap[key].length }))
    .reduce((acc, e) => acc.numBlogs < e.numBlogs ? e : acc)

  return { author: result.author, blogs: result.numBlogs }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length == 0)
    return undefined

  const hmap = _.groupBy(blogs, 'author')

  const result = Object.keys(hmap)
    .map(key => ({ author: key, numLikes: hmap[key].reduce((acc, e) => acc + e.likes, 0) }))
    .reduce((acc, e) => acc.numLikes < e.numLikes ? e : acc)

  return { author: result.author, likes: result.numLikes }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}