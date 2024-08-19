import React, { useEffect, useState } from 'react';
import '../App.css';

const GEOCODING_API_URL = 'https://api.api-ninjas.com/v1/geocoding?'
const WEATHER_API_URL = 'https://api.api-ninjas.com/v1/weather?'
const KEY = 'fryiSxvTFUw2YRVWMnfnPA==rwrSkP2ZQifI4bI6'

function Form() {
  let [city, setCity] = useState("")
  let [country, setCountry] = useState("")
  let [result, setResult] = useState("")

  const search = (e) => {
    e.preventDefault()
    // Fetch
    fetch(`${GEOCODING_API_URL}city=${city}&country=${country}`, {
        headers: {
            'X-Api-Key': KEY
        }
    })
    .then(response => response.json())
    .then(results => {
      console.log(results)
      if (results && results.length) {
        // Now fetch the weather
        fetch(`${WEATHER_API_URL}lat=${results[0].latitude}&lon=${results[0].longitude}`, {
            headers: {
                'X-API-Key': KEY
            }
        })
        .then(response => response.json())
        .then(weatherResults => {
            console.log(weatherResults)
            let descTemp = weatherResults.temp < 5 ? 'chilly' : weatherResults.temp > 30 ? 'toasty' : 'pleasant'
            let descWind = weatherResults.wind_speed < 5 ? 'breeze' : weatherResults.wind_speed > 15 ? 'gale' : 'wind'
            let windDirection = 'northerly'
            if (weatherResults.wind_degrees >= 22.5 && weatherResults.wind_degrees < 67.5) {
                windDirection = 'northeasterly'
            }
            else if(weatherResults.wind_degrees >= 67.5 && weatherResults.wind_degrees < 112.5) {
                windDirection = 'easterly'
            }
            else if(weatherResults.wind_degrees >= 112.5 && weatherResults.wind_degrees < 157.5) {
                windDirection = 'southeasterly'
            }
            else if(weatherResults.wind_degrees >= 157.5 && weatherResults.wind_degrees < 202.5) {
                windDirection = 'southerly'
            }
            else if(weatherResults.wind_degrees >= 202.5 && weatherResults.wind_degrees < 247.5) {
                windDirection = 'southwesterly'
            }
            else if(weatherResults.wind_degrees >= 247.5 && weatherResults.wind_degrees < 292.5) {
                windDirection = 'westerly'
            }
            else if(weatherResults.wind_degrees >= 292.5 && weatherResults.wind_degrees < 337.5) {
                windDirection = 'northwesterly'
            }
            let tempF = Math.round(32 + (weatherResults.temp * 1.8))
            setResult(`Currently in ${city} we find it to be a ${descTemp} ${weatherResults.temp}°C (that's ${tempF}°F!) with a ${windDirection} ${descWind} of ${Math.round(weatherResults.wind_speed)}KPH.`)
        })
      }
    })
  }

  return (
      <div className="App-form">
        <form onSubmit={search}>
            <div>
              <label>City:</label> 
              <input type="text" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div>
              <label>Country:</label> 
              <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
            </div>
            <input type="submit" />
        </form>
        <div className="results">
            {result}
        </div>
      </div>
  );
}

export default Form;
