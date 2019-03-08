import loginService from '../services/login'
import blogService from '../services/blogs'
import { setErrorNotification } from './notificationReducer'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SET = 'SET'

export const login = (username, password) => {
  return async dispatch => {
    try {
      let response = await loginService.login({ username, password })
      const user = response.data
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: LOGIN, data: user })
    } catch (error) {
      setErrorNotification(dispatch, 'invalid username or password')
    }
  }
}

export const logout = () => {
  return async dispatch => {
    blogService.setToken(null)
    dispatch({ type: LOGOUT })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({ type: SET, data: user })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data
    case LOGOUT:
      return null
    case SET:
      return action.data
    default:
      return state
  }
}

export default userReducer