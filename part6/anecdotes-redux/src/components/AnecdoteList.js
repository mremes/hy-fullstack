import React from 'react'
import { connect } from 'react-redux'
import { AnecdoteFilter, Anecdote } from './'

const AnecdoteList = (props) => (
    <div>
        <AnecdoteFilter />
        {props.anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}
    </div>
)

const anecdotesToShow = ({ anecdotes, filter }) => {
    return anecdotes
        .filter(a => a.content.includes(filter))
        .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        anecdotes: anecdotesToShow(state),
        notification: state.notification
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdoteList
