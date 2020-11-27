import React from 'react'
import Country from './Country'

const MultipleCountries = ({ countries_obj_array, setSearchField }) => {

    let name_array = [];
    for (const country_obj of countries_obj_array){
        let name = country_obj.name;
        name_array = name_array.concat(name);
    }
    
    return name_array.map(country_name => {
        return (
            <Country 
                key={country_name} 
                country_name={country_name} 
                setSearchField={setSearchField}
            />
        )   
    });
    
}

export default MultipleCountries