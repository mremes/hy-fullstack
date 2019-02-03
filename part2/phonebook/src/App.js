import React, { useState, useEffect } from 'react';
import { ListingFilter, AddPersonForm, PersonListing } from './components/Contacts'
import { getAll, createPerson, deletePerson, updatePerson } from './services/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => getAll().then(persons => setPersons(persons)), []);

  const handleNameFilter = (event) => setNameFilter(event.target.value.toLowerCase());
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewPhoneNum = (event) => setNewPhoneNum(event.target.value);


  const handlePersonUpdates = (serviceFn, oldPersons, newPerson) => {
    serviceFn(newPerson).then(p => {
      setPersons(oldPersons.concat(newPerson).sort((a, b) => a.id - b.id));
      setNewName('');
      setNewPhoneNum('');
    }).catch(err => console.log(err));
  };

  const handleSubmitPerson = (event) => {
    event.preventDefault();

    if (newName.length === 0) return alert('tyhjä nimi');
    let existingPerson = persons.find(p => p.name === newName);

    if (existingPerson && existingPerson.phone === newPhoneNum) return alert(`${newName} on jo luettelossa`);

    else if (existingPerson && window.confirm(`${existingPerson.name} on jo luettelossa. Korvataanko vanha numero uudella?`))
      return handlePersonUpdates(updatePerson,
        persons.filter(p => p.id !== existingPerson.id),
        { ...existingPerson, phone: newPhoneNum });

    let person = { name: newName };
    if (newPhoneNum.length > 0) person.phone = newPhoneNum;
    handlePersonUpdates(createPerson, persons, person);
  };

  const handleDeletePerson = (event) => {
    let id = event.target.id;
    let personName = persons.find(p => p.id === id).name;
    let confirm = window.confirm(`Poistetaanko ${personName}?`);
    if (confirm) deletePerson(id).then(setPersons(persons.filter(p => p.id !== id)));
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
      <PersonListing persons={personsList} deleteHandler={handleDeletePerson} />
    </div>
  )

}

export default App