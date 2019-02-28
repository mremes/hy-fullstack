import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import { setGlobalTimeout } from '../utils'

const AnecdoteForm = (props) => {
    const handler = (event) => {
        event.preventDefault()
        props.newAnecdote(event.target.anecdote.value)
        props.setNotification('created an anecdote')
        setGlobalTimeout(() => props.resetNotification())
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
    setNotification,
    resetNotification
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
