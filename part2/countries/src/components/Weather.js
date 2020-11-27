import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {city} ) => {

    const [ weatherDetails, setWeatherDetails ] = useState('')

    const getWeather = () => {
        const api_key = process.env.REACT_APP_API_KEY
        const params = {
            access_key: api_key,
            query: city
        }
        axios.get('http://api.weatherstack.com/current', {params})
            .then(response => {
                const apiResponse = response.data;
                const weatherInfo = {
                    name: apiResponse.location.name,
                    temp: apiResponse.current.temperature,
                    icon: apiResponse.current.weather_icons[0],
                    description: apiResponse.current.weather_descriptions,
                    wind_speed: apiResponse.current.wind_speed,
                    wind_direction: apiResponse.current.wind_dir
                };
                setWeatherDetails(weatherInfo);
            }).catch(error => {
                console.log(error);
            });
    }
    
    useEffect(getWeather, [city]);  // Load only when city is received

    return (

        <div>
            <h2>Weather in {weatherDetails.name}</h2>
            <h4>temperature: {`${weatherDetails.temp} Celsius`}</h4>
            <img src={weatherDetails.icon} alt={`${weatherDetails.description}`} />
            <h4>wind: {`${weatherDetails.wind_speed} mph direction ${weatherDetails.wind_direction}`}</h4>
        </div>
    )


}

export default Weather