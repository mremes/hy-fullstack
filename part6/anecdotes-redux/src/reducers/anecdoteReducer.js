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
  return { type: VOTE, data: { id } }
}

export const newAnecdote = (anecdote) => {
  return { type: NEW, data: asObject(anecdote) }
}

export const initializeAnecdotes = (anecdotes) => {
  return {type: INIT, data: anecdotes}
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      const id = action.data.id
      const obj = state.find(a => a.id === id)
      const newObj = { ...obj, votes: obj.votes + 1 }
      return state.map(a => a.id === id ? newObj : a)
    case NEW:
      return [...state, action.data]
    case INIT:
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer