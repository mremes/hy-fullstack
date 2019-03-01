import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const handler = async (event) => {
        event.preventDefault()
        event.persist()

        props.newAnecdote(event.target.anecdote.value)
        props.setNotification('created an anecdote')
        
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={handler}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
    )
}

const mapDispatchToProps = {
    newAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
