import React from 'react'

const Persons = ({persons, searchField, removePerson}) => {
    
    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(searchField.toLowerCase()))
      
      // console.log('Filtered Persons:' + JSON.stringify(filteredPersons))
  
      return filteredPersons.map(person => 
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => removePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      )
}


export default Persons