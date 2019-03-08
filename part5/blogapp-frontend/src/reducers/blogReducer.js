import blogService from '../services/blogs'
import { setErrorNotification, setSuccessNotification } from './notificationReducer'

const LIKE = 'LIKE'
const NEW = 'NEW'
const DELETE = 'DELETE'
const INIT = 'INIT'

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const obj = getState().blogs.find(a => a.id === id)
    const response = await blogService.updateBlog({ ...obj, likes: obj.likes + 1 }, obj.id)

    if (response.status !== 200) {
      setErrorNotification(dispatch, 'unable to like blog')
      return
    }

    let newObj = response.data
    newObj = { ...newObj, user: obj.user }
    dispatch({ type: LIKE, data: newObj })
  }
}

export const newBlog = (blog, user) => {
  return async dispatch => {
    const response = await blogService.createBlog(blog)

    if (response.status !== 201) {
      setErrorNotification(dispatch, 'unable to create blog')
      return
    }

    let newObject = response.data
    newObject = { ...newObject, user: { username: user.username } }
    dispatch({ type: NEW, data: newObject })
    setSuccessNotification(dispatch, 'successfully created blog')
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const deleted = await blogService.deleteBlog(id)
    if (!deleted) setErrorNotification(dispatch, 'error while deleting blog')
    else dispatch({ type: DELETE, data: { id } })
    setSuccessNotification(dispatch, 'succesfully deleted blog')
  }
}

export const initializeBlogs = () => {
  return async (dispatch, getState) => {
    const response = await blogService.getAll()
    const user = getState().user
    if (user) blogService.setToken(user.token)
    dispatch({ type: INIT, data: response.data })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case LIKE:
      return state.map(a => a.id === action.data.id ? action.data : a)
    case NEW:
      return [...state, action.data]
    case DELETE:
      return state.filter(b => b.id !== action.data.id)
    case INIT:
      return action.data
    default:
      return state
  }
}

export default blogReducer