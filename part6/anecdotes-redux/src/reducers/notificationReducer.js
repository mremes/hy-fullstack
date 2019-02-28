const SET = 'SET_NOTIFICATION'

export const setNotification = message => {
    return {
        type: SET,
        message
    }
}

export const resetNotification = () => {
    return {
        type: SET,
        message: ''
    }
}

const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case SET:
          return action.message
        default:
          return state
    }
}

export default notificationReducer