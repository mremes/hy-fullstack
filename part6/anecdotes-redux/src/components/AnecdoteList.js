import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

let timeout

const Anecdote = ({ store, anecdote }) => {
    const voteHandler = (id) => {
        clearTimeout(timeout)
        store.dispatch(vote(id))
        store.dispatch(setNotification(`voted for "${anecdote.content}"`))
        timeout = setTimeout(() => store.dispatch(resetNotification()), 5000)
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

const AnecdoteList = ({ store }) => {
    return (
        <div>
            {store.getState().anecdotes
                .filter(a => a.content.includes(store.getState().filter))
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} store={store} />)}
        </div>  
    )
}

export default AnecdoteList
