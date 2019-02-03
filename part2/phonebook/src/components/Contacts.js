import React from 'react';

export const ListingFilter = ({ handler }) => {
    return (<div>
        <form>
            rajaa näytettäviä: <input onChange={handler} />
        </form>
    </div>)
}

export const AddPersonForm = ({ formHandler, name, nameHandler, phoneNum, phoneNumHandler }) => {
    return (<div>
        <form onSubmit={formHandler}>
            <div>
                nimi: <input value={name} onChange={nameHandler} /> <br />
                puhelinnumero: <input value={phoneNum} onChange={phoneNumHandler} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    </div>)
}

export const PersonListing = ({ persons, deleteHandler }) => {
    return (<div>
        {persons.map(p => <li key={p.id}>{p.name} {p.phone} <button id={p.id} onClick={deleteHandler}>poista</button></li>)}
    </div>)
}