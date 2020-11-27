import React from 'react'
import Weather from './Weather'

const DetailedCountry = ({ country }) => {

    country = country[0]

    const filterLanguages = (lang_obj_array) => {
        let lang_array = [];
        for (const lang_obj of lang_obj_array){
            let lang = lang_obj.name
            lang_array = lang_array.concat(lang);
        }
        return lang_array
    }

    const newCountry = {
        name: country.name,
        capital: country.capital,
        population: country.population,
        languages: filterLanguages(country.languages),
        flag: country.flag
        
    }

    return (
        <div>
            <h2>{newCountry.name}</h2>
            <div>capital {newCountry.capital}</div>
            <div>population {newCountry.population}</div>
            <div>
                <h3>languages</h3>
                <ul>
                    {newCountry.languages.map(lang => {
                        return <li key={lang}>{lang}</li>
                    })}
                </ul>
            </div>
            <img src={newCountry.flag} alt={newCountry.name + 'flag'}/>
            <Weather key={newCountry.name} city={newCountry.capital}/>
        </div>
    )
}

export default DetailedCountry