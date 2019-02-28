import React from 'react'
import { Notification, AnecdoteForm, AnecdoteList } from './components'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>create new</h2>
      <AnecdoteForm />
      <h2>anecdotes</h2>
      <AnecdoteList />
    </div>
  )
}

export default App