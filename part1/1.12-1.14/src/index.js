import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {incrementValueAtIndex, indexWithHighestValue} from './utils'


const Anecdote = ({ text, numVotes }) => {
    return (
        <div>
            {text}<br />
            this anecdote has {numVotes} votes.
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));

    const numAnecdotes = props.anecdotes.length;
    const mostVotesIdx = indexWithHighestValue(votes);

    const nextHandler = () => {
        setSelected(Math.floor(Math.random() * numAnecdotes));
    }

    const voteHandler = () => {
        setVotes(incrementValueAtIndex(votes, selected));
    }

    return (
        <div>
            <h2>The Anecdote of the Day</h2>
            <Anecdote text={props.anecdotes[selected]} numVotes={votes[selected]} />
            <button onClick={nextHandler}>next</button>
            <button onClick={() => { voteHandler(); nextHandler(); }}>vote</button>
            <h2>The Anecdote with the Most Votes</h2>
            <Anecdote text={props.anecdotes[mostVotesIdx]} numVotes={votes[mostVotesIdx]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)