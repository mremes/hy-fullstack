import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres)
  { title, published, author { name, born }, genres }
}
`

const SET_BIRTHYEAR = gql`
mutation setBirhtyear($name: String!, $year: Int!) {
  editAuthor(name: $name, setBornTo: $year) { name, born, bookCount }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const FAVORITE_GENRE = gql`{ me { favoriteGenre } }`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')

  const client = useApolloClient();
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const favoriteGenre = useQuery(FAVORITE_GENRE)
  const addBook = useMutation(CREATE_BOOK, { refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] })
  const setBirthyear = useMutation(SET_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })
  const login = useMutation(LOGIN)

  const navs = [
    { name: 'authors', label: 'authors', whenLogged: false },
    { name: 'books', label: 'books', whenLogged: false },
    { name: 'add', label: 'add book', whenLogged: true },
    { name: 'recommend', label: 'recommended', whenLogged: false }
  ]

  return (
    <div>
      <div>
        <Login client={client} login={login} token={token} setToken={setToken} />
      </div>
      <div>
        {navs.map(n => {
          if ((token && n.whenLogged) || !n.whenLogged) {
            return (<button key={n.name} onClick={() => setPage(n.name)}>{n.label}</button>)
          }
          return null
        })}
      </div>
      <Authors show={page === 'authors'} result={authors} setBirthyear={setBirthyear} />
      <Books client={client} show={page === 'books'} result={books} />
      <NewBook show={page === 'add'} addBook={addBook} />
      <Recommend show={page === 'recommend'} resultBooks={books} resultGenre={favoriteGenre} />
    </div>
  )
}

export default App
