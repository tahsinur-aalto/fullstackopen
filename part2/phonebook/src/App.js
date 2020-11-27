import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  // Controls form input
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchField, setSearchField ] = useState('') 

  // Set initial persons array by fetching from server

  const getPersonsFromDB = () => {
    console.log('effect')
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
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
    const index = persons.map(person => person.name).indexOf(newName);
    console.log(index)
    if(index > -1){ // Already exists so update
      updatePerson(personObject, index);
    }else{ // Index is -1 which means does not exist
      personService
        .create(personObject)
        .then(returnedPerson => {
          // Add newly added person to current state
          setPersons(persons.concat(returnedPerson)) // Append to persons array by creating copy
        })
        .catch(error => {
          console.log(error)
        })
      
    }
    setNewName('')  // Reset value of controlled input
    setNewNumber('')
  }

  const updatePerson = (updatedPerson, index) => {
    const personObj = persons[index];
    window.confirm(`${updatedPerson.name} is already added to the phonebook, replace the old number with a new one?`)
    personService
    .update(personObj.id, updatedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(p => p.id === personObj.id
        ? {...updatedPerson, id: returnedPerson.id }
        : p
      ))
    })
    .catch(error => {
      console.log(`Updating of person ${newName} failed as person was already removed from the server `)
    })
  }


  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService
      .remove(id)
      .then(() =>  {
        setPersons(persons.filter(p => p.id !== id) )
      })
      .catch(error => {
        console.log(error)
      })
    }
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
        removePerson={deletePerson}
      />
    </div>
  )
}

export default App