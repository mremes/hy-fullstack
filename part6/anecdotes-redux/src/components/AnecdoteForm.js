import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

let timeout

const AnecdoteForm = ({ store }) => {
    const handler = (event) => {
        clearTimeout(timeout)
        event.preventDefault()
        store.dispatch(newAnecdote(event.target.anecdote.value))
        store.dispatch(setNotification('created an anecdote'))
        timeout = setTimeout(() => store.dispatch(resetNotification()), 5000)
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={handler}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
