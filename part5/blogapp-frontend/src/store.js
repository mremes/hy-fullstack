import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { notificationReducer, blogReducer, userReducer, loginReducer } from './reducers'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  login: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store