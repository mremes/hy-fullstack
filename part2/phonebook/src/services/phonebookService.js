import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'


const getIdUrl = (id) => `${baseUrl}/${id}`
export const getAll = () => {
    let request = axios.get(baseUrl);
    return request.then(response => response.data);
}

export const createPerson = (person) => {
    let request = axios.post(baseUrl, person);
    return request.then(response => response.data);
}

export const deletePerson = (personId) => {
    let request = axios.delete(getIdUrl(personId));
    return request.then(response => response.data);
}

export const updatePerson = (person) => {
    let request = axios.put(getIdUrl(person.id), person);
    return request.then(response => response.data);
}