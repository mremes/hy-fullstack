import { setTimeoutMsec } from '../utils'
import { TIMEOUT_SEC } from '../config'

const types = {
  ERROR:  'ERROR',
  SUCCESS: 'SUCCESS',
  CLEAR: 'CLEAR'
}

const setNotification = (dispatch, message, type, seconds = TIMEOUT_SEC) => {
  dispatch({ type, message })
  setTimeoutMsec(() => dispatch({ type: 'CLEAR' }), seconds * 1000)
}

export const setErrorNotification = (dispatch, message) => {
  setNotification(dispatch, message, types.ERROR)
}

export const setSuccessNotification = (dispatch, message) => {
  setNotification(dispatch, message, types.SUCCESS)
}

const notificationReducer = (state = { message: null, type: null }, action) => {
  switch (action.type) {
    case types.ERROR:
      return { message: action.message, type: 'error' }
    case types.SUCCESS:
      return { message: action.message, type: 'success' }
    case types.CLEAR:
      return { message: null, type: null }
    default:
      return state
  }
}

export default notificationReducer