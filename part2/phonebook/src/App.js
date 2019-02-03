import React, { useState, useEffect } from 'react';
import { ListingFilter, AddPersonForm, PersonListing } from './components/Contacts'
import { getAll, createPerson, deletePerson, updatePerson } from './services/phonebookService'

const Notification = ({ message, handler, className }) => {
  if (message === '') {
    return null
  }

  setTimeout(() => handler(''), 3000);

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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

    if (newName.length === 0) return setErrorMessage('tyhjä nimi');
    let existingPerson = persons.find(p => p.name === newName);

    if (existingPerson && existingPerson.phone === newPhoneNum) {
      return setErrorMessage(`${newName} on jo luettelossa`);
    }
    else if (existingPerson && window.confirm(`${existingPerson.name} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
      setSuccessMessage(`Päivitettiin henkilön ${person.name} puhelinnumero.`)
      return handlePersonUpdates(updatePerson,
        persons.filter(p => p.id !== existingPerson.id),
        { ...existingPerson, phone: newPhoneNum });
    }
    else if (existingPerson) {
      return;
    }

    let person = { name: newName };

    if (newPhoneNum.length > 0) {
      person.phone = newPhoneNum;
    }
    handlePersonUpdates(createPerson, persons, person);
    setSuccessMessage(`Lisättiin ${person.name}`)
  };

  const handleDeletePerson = (event) => {
    let id = event.target.id;
    console.log(id);
    console.log(persons)
    let personName = persons.find(p => p.id == id).name;
    let confirm = window.confirm(`Poistetaanko ${personName}?`);
    if (confirm) {
      deletePerson(id).then(_ => {
        setPersons(persons.filter(p => p.id != id));
        setSuccessMessage(`Henkilö ${personName} poistettiin onnistuneesti.`);
      }).catch(err => {
        console.log(err);
        if (err.message.includes('404')) setErrorMessage(`Henkilö ${personName} on jo poistettu.`);
        else setErrorMessage(`Tuntematon virhe.`);
      });
    }
  };

  let personsList = persons.filter(p => p.name.toLowerCase().startsWith(nameFilter));
  personsList.forEach(p => p.phone = p.phone || 'N/A');

  return (
    <div>
      <h2>puhelinluettelo</h2>
      <ListingFilter handler={handleNameFilter} />
      <h2>lisää uusi</h2>
      <Notification message={errorMessage} handler={setErrorMessage} className="error" />
      <Notification message={successMessage} handler={setSuccessMessage} className="success" />
      <AddPersonForm formHandler={handleSubmitPerson} name={newName}
        nameHandler={handleNewName} phoneNum={newPhoneNum}
        phoneNumHandler={handleNewPhoneNum} />
      <h2>numerot</h2>
      <PersonListing persons={personsList} deleteHandler={handleDeletePerson} />
    </div>
  )

}

export default App