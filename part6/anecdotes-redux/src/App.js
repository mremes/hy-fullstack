import React from 'react';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'

const App = ({ store }) => {
  return (
    <div>
      <Notification store={store} />
      <h2>create new</h2>
      <AnecdoteForm store={store} />
      <h2>anecdotes</h2>
      filter <AnecdoteFilter store={store} />
      <AnecdoteList store={store} />
    </div>
  )
}

export default App