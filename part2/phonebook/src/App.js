import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  // Controls form input
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchField, setSearchField ] = useState('') 

  // Set initial persons array by fetching from server

  const getPersonsFromDB = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(getPersonsFromDB, []) // Run the effect only during first render(hence [] array)

  const addPerson = (event) => {
    event.preventDefault()    // Prevent default action of submitting form and reloading

    const personObject = {
      name: newName,
      number: newNumber,
      // date: new Date().toISOString(),
      // important: Math.random() < 0.5,
      id: persons.length + 1,
    }
    
      if(persons.map(person => person.name).includes(newName)){
        alert(`${newName} is already added to phonebook`) // String template like f-strings
      }
      else{
        setPersons(persons.concat(personObject)) // Append to notes array by creating copy
      }
      setNewName('')  // Reset value of controlled input
      setNewNumber('')
  }

  // Register person change event
  const handlePersonChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearchField(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchField={searchField}
        handleChange={handleSearchChange}/>

      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        searchField={searchField}
      />
    </div>
  )
}

export default App