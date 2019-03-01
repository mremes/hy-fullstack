import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = (props) => {
  const anecdote = props.anecdote

  const voteHandler = (id) => {
    props.vote(id)
    props.setNotification(`voted for "${anecdote.content}"`)
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
  setNotification
}

const ConnectedAnecdote = connect(
  null,
  mapDispatchToProps
)(Anecdote)

export default ConnectedAnecdote