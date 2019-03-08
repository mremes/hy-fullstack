import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  const notification = props.notification
  if (!notification.message) {
    return null
  }

  return (
    <Alert variant={notification.type === 'error' ? 'danger' : notification.type }>
      {notification.message}
    </Alert>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification