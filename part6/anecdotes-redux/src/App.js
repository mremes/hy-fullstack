import React, { useEffect } from 'react'
import { Notification, AnecdoteForm, AnecdoteList } from './components'
import { connect } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  },[])

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

export default connect(null, { initializeAnecdotes })(App)