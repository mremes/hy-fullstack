import React, { useState } from 'react'

const Authors = ({show, result, setBirthyear}) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  if (!show || result.loading) {
    return null
  }

  const authors = result.data.allAuthors || []

  const submit = async (e) => {
    e.preventDefault()
    setBirthyear({ variables: { name, year: parseInt(year) }})
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div> name 
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a =>
            <option value={a.name} key={a.name}>{a.name}</option>
            )}
        </select></div>
        <div> year <input value={year} onChange={({ target }) => setYear(target.value)} /></div>
        <button type='submit'>set </button>
      </form>
    </div>
  )
}

export default Authors