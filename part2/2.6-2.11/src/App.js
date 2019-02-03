import React, { useState, useEffect } from 'react';
import {ListingFilter, AddPersonForm, PersonListing} from './components/Contacts'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(response => setPersons(response.data));
  }, []);


  const handleNameFilter = (event) => setNameFilter(event.target.value.toLowerCase());
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewPhoneNum = (event) => setNewPhoneNum(event.target.value);

  const handleSubmitPerson = (event) => {
    event.preventDefault();

    if (newName.length === 0) return alert('tyhjä nimi');
    else if (persons.filter(p => p.name === newName).length > 0) return alert(`${newName} on jo luettelossa`);

    let person = {
      id: persons.length + 1,
      name: newName,
    };

    if (newPhoneNum.length > 0)
      person.phone = newPhoneNum;

    setPersons(persons.concat(person));
    setNewName('');
    setNewPhoneNum('');

  };

  let personsList = persons.filter(p => p.name.toLowerCase().startsWith(nameFilter));
  personsList.forEach(p => p.phone = p.phone || 'N/A');

  return (
    <div>
      <h2>puhelinluettelo</h2>
      <ListingFilter handler={handleNameFilter} />
      <h2>lisää uusi</h2>
      <AddPersonForm formHandler={handleSubmitPerson} name={newName} 
                     nameHandler={handleNewName} phoneNum={newPhoneNum} 
                     phoneNumHandler={handleNewPhoneNum} />
      <h2>numerot</h2>
      <PersonListing persons={personsList} />
    </div>
  )

}

export default App
