import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import { setGlobalTimeout } from '../utils'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const handler = async (event) => {
        event.preventDefault()
        event.persist()
        const object = event.target.anecdote.value
        const newObject = await anecdoteService.create(object)
        props.newAnecdote(newObject.content)
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
