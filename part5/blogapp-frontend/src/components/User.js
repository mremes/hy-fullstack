import React from 'react'
import { connect } from 'react-redux'
import BlogList from './BlogList'

const User = (props) => {
  const user = props.users.find(u => u.id === props.userId)
  if (!user) return null

  return (<div>
    <h2>{user.name}</h2>
    <BlogList blogList={user.blogs}/>
  </div>)
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(User)