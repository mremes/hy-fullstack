import React from 'react'
import Books from './Books'

const Recommend = ({ show, resultBooks, resultGenre }) => {
    if (!show || resultBooks.loading || resultGenre.loading) {
      return null
    }
    
    const books = resultBooks.data.allBooks
    const favoriteGenre = resultGenre.data.me.favoriteGenre
    const recommended = books.filter(b => b.genres.includes(favoriteGenre))

    return (
      <div>
        <br />
        books in your favorite genre <b>{favoriteGenre}</b>
        <Books show={true} books={recommended} recommended={true} />
      </div>
    )
  }
  
  export default Recommend