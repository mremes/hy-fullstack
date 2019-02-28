import React from 'react';
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = ({ store }) => {
    return (
        <div style={{ marginBottom: 10 }}>
            <input onChange={(event) => store.dispatch(setFilter(event.target.value))} />
        </div>
    )
}

export default AnecdoteFilter
