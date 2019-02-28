import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => (
    <div style={{ marginBottom: 10 }}>
        <input onChange={(event) => props.setFilter(event.target.value)} />
    </div>
)

const mapDispatchToProps = {
    setFilter
}

const ConnectedAnecdoteFilter = connect(
    null,
    mapDispatchToProps
)(AnecdoteFilter)

export default ConnectedAnecdoteFilter
