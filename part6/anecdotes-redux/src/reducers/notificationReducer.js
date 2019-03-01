import { TIMEOUT_SEC } from '../config'
import { setTimeoutMsec } from '../utils'

const SET = 'SET_NOTIFICATION'

export const setNotification = (message, seconds = TIMEOUT_SEC) => {
    return async dispatch => {
        dispatch({ type: SET, message })
        setTimeoutMsec(() => dispatch({ type: SET, message: '' }), seconds * 1000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case SET:
            return action.message
        default:
            return state
    }
}

export default notificationReducer