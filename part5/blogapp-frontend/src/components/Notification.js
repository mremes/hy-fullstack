import React from 'react'

const Notification = ({ message, handler, className }) => {
  if (message === '') {
    return null
  }

  setTimeout(() => handler(''), 3000)

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification