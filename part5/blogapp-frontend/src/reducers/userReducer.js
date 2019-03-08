import userService  from '../services/users'

const INIT = 'INIT_USERS'

export const initializeUsers = () => {
  return async dispatch => {
    const request = await userService.getAll()
    const users = request.data
    dispatch({ type: INIT, data: users })
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
    case INIT:
      return action.data
    default:
      return state
  }
}

export default userReducer