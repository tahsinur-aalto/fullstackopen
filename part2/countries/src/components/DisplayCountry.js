import React from 'react'
import DetailedCountry from './DetailedCountry'
import MultipleCountries from './MultipleCountries'

const DisplayCountry = ( {countries, searchField, setSearchField} ) => {
  
    const filteredCountries = countries.filter(country => 
      country.name.toLowerCase().includes(searchField.toLowerCase()))
    
    // console.log("Filtered Countries:" + JSON.stringify(filteredCountries))
    
    if(filteredCountries.length > 10 ){
      return (
        <div>Too many matches, specify another filter</div>
      )

    } else if(filteredCountries.length === 1) {
      console.log(filteredCountries)
      return (
        <DetailedCountry country={filteredCountries}/>
      )

    } else if(filteredCountries.length > 1) {
      return (
        <MultipleCountries 
          countries_obj_array={filteredCountries}
          setSearchField={setSearchField}  
        />
      )
      
    } else {
      return (
        <div>No countries match your search.</div>
      )
    }
}


export default DisplayCountry