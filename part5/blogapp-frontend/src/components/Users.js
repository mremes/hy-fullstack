import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  return (<div>
    <h2>users</h2>
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th><b>blogs created</b></th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(e => (
          <tr key={e.username}>
            <td><Link to={`/users/${e.id}`}>{e.name}</Link></td>
            <td>{e.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>)
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)