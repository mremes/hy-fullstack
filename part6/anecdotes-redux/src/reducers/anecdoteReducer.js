import anecdoteService from '../services/anecdotes'

const VOTE = 'VOTE'
const NEW = 'NEW'
const INIT = 'INIT'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    let obj = getState().anecdotes.find(a => a.id === id)
    obj = { ...obj, votes: obj.votes + 1 }
    obj = await anecdoteService.update(obj)
    dispatch({ type: VOTE, data: obj })
  }
}

export const newAnecdote = (anecdote) => {
  return async dispatch => {
    const newObject = await anecdoteService.create(anecdote)
    dispatch({ type: NEW, data: newObject })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: INIT, data: anecdotes })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return state.map(a => a.id === action.data.id ? action.data : a)
    case NEW:
      return [...state, action.data]
    case INIT:
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer