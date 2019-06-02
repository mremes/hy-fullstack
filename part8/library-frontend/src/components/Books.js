import React, { useState } from 'react'
import { gql } from 'apollo-boost'

const BOOKS_BY_GENRE = gql`
query getAllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

const Books = ({ client, show, result, books, recommended }) => {
  if (((!show || (result && result.loading)) && !recommended)) {
    return null
  }
  books = books || result.data.allBooks

  let genres = []
  if (result) {
    genres = Array.from(new Set([].concat.apply([], (books.map(b => b.genres || [])))))
  }

  const [filteredBooks, setFilteredBooks] = useState(books)

  const filterBooks = async (genre) => {
    if (genre) {
      const { data } = await client.query({
        query: BOOKS_BY_GENRE,
        variables: { genre: genre }
      })
      setFilteredBooks(data.allBooks)
    } else {
      setFilteredBooks(books)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)}
        </tbody>
      </table>
      <div>
        {!recommended ? <button onClick={() => filterBooks(null)}>all</button> : null}
        {!recommended ? genres.map(g => <button key={g} onClick={() => filterBooks(g)}>{g}</button>) : null}
      </div>
    </div>
  )
}

export default Books