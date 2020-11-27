import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import DisplayCountry from './components/DisplayCountry'

const App = () => {

  const [ allCountries, setAllCountries ] = useState([])
  const [ searchField, setSearchField ] = useState('')

  const getAllCountries = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('All country names extracted')
        setAllCountries(response.data)
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(getAllCountries, []) // Load only on first render


  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearchField(event.target.value)
  }

  return (
    <div>
      <Filter 
        searchField={searchField}
        handleChange={handleSearchChange}
      />
      
      <DisplayCountry 
        countries={allCountries} 
        searchField={searchField} 
        setSearchField={setSearchField}
      />

    </div>
  )


}

export default App;
