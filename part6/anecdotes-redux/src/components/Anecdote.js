import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import { setGlobalTimeout } from '../utils'

const Anecdote = (props) => {
  const anecdote = props.anecdote
  const voteHandler = (id) => {
    props.vote(id)
    props.setNotification(`voted for "${anecdote.content}"`)
    setGlobalTimeout(() => props.resetNotification())
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={() => voteHandler(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  vote,
  setNotification,
  resetNotification
}

const ConnectedAnecdote = connect(
  null,
  mapDispatchToProps
)(Anecdote)

export default ConnectedAnecdote