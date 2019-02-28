const SET = 'SET_FILTER'

export const setFilter = message => {
    return {
        type: SET,
        message
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