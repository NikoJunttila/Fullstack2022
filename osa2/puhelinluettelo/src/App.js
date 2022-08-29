import { useState, useEffect } from 'react'
import personService from './services/persons'
import React from "react";

const PersonForm = ({onSubmit, newName, onNameChange, newNumber, onNumberChange}) => (
<form onSubmit={onSubmit}>
        <div>
          name:   <input value={newName} onChange={onNameChange} /><br></br>
          number: <input value={newNumber} onChange={onNumberChange}></input>
        </div>
        <div>       
          <button type="submit">add</button>
        </div>
      </form>
)


const SuccessNotification = ({ message,}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}


const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} ></input>
    </div>
  )
}

const Phonelist = ({persons,newFilter,deletePerson}) => { 
  return (
<div>
{persons.filter((val) => {
         if (newFilter === "") {
           return val
         } else if (val.name.toLowerCase().includes(newFilter.toLowerCase())){
           return val
         }
       }).map((val,key) => {
         return (
           <div key={key}>
          <p>{val.name}:  {val.number}<button onClick={() => deletePerson(val.id)}>delete</button>  </p>   
           </div>

         )
       })}
</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])



const addPerson = (event) => {
event.preventDefault()
const personObject = {
  name: newName,
  number: newNumber,
}
personService
.create(personObject)
.then(response => {
  setPersons(persons.concat(response.data))
  setSuccessMessage(
    `Added ${personObject.name}`
  )
  setTimeout(() => {
    setSuccessMessage(null)
  }, 5000)
})

if(persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())){
  window.alert(`${newName} is already added to phonebook`)
}
setNewName("")
setNewNumber("")
}
const handleChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFilter = (event) => {
  setNewFilter(event.target.value)
  console.log(event.target.value)
}
const deletePersons = (id) => {
  const name = persons.find(person => person.id === id).name
  if(window.confirm(`Delete ${name}`)){
      personService.discard(id)
      setPersons( persons.filter(person => person.id !== id))
      setSuccessMessage(
        `Deleted ${name}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
  }
}


  return (
    <div>
      <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <Filter value = {newFilter} onChange = {handleFilter}/>
    </div>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} onNameChange={handleChange} newNumber={newNumber} onNumberChange={handleNumberChange} ></PersonForm>
      <h2>Numbers</h2>
      <ul>
      <Phonelist persons={persons} newFilter={newFilter} deletePerson={deletePersons}> </Phonelist>
      </ul>
    </div>
  )
}


export default App