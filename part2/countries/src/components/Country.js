import React from 'react'

const Country = ({ country_name, setSearchField }) => {

    const showCountry = () => {
        setSearchField(country_name);
    }

    return (
        <div key={country_name}>
            {country_name} 
            <button onClick={showCountry}>Show</button>
        </div>
    )

}

export default Country