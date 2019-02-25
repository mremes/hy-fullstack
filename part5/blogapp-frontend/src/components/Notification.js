import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

export default Notification