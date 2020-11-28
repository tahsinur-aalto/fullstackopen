import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  // Controls form input
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchField, setSearchField ] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  // Set initial persons array by fetching from server
  const getPersonsFromDB = () => {
    console.log('effect')
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
      .catch(error => {
        console.log('Failed to extract data due to network error')
      })
  }

  useEffect(getPersonsFromDB, []) // Run the effect only during first render(hence [] array)

  const processMessage = (msg, msgType, error=null) => {
    console.log(msgType)
    if(msgType === 'success'){
      setMessage(msg);
    }else if(msgType === 'error'){
      const errorMessage = error.response.data 
        ? `${msg} due to error: ${error.response.data.error}` 
        : msg
      console.log(errorMessage)
      setMessage(msg);
    }
    setMessageType(msgType);
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 4000)
  }

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
          processMessage(`Added ${newName}`, 'success')
          setPersons(persons.concat(returnedPerson)) // Append to persons array by creating copy
        })
        .catch(error => {
          processMessage(`Failed to add ${newName}`, 'error', error)
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
      processMessage(`Updated ${personObj.name}`, 'success')
      setPersons(persons.map(p => p.id === personObj.id
        ? {...updatedPerson, id: returnedPerson.id }
        : p
      ))
    })
    .catch(error => {
      processMessage(`Information of ${personObj.name} has already been removed from server`, 'error', error)
    })
  }


  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService
      .remove(id)
      .then(() =>  {
        processMessage(`Deleted ${name}`, 'success')
        setPersons(persons.filter(p => p.id !== id) )
      })
      .catch(error => {
        processMessage(`Failed to delete ${name}.`, 'error', error)
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
      <Notification message={message} type={messageType} />
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