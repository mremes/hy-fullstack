import React, { useState, useEffect } from 'react';
import axios from 'axios'


const WeatherInfo = ({ weather }) => {
  let temp = weather.main.temp;
  let windSpeed = weather.wind.speed;
  let windDirection = weather.wind.deg;
  let description = weather.weather[0].description;
  let iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
  return (<div>
    <img src={iconUrl} alt="weatherIcon" /><br />
    It is {description} there. <br/>
    <b>temperature </b> {temp}°C<br />
    <b>wind: </b> {windSpeed} m/s at {windDirection} degrees<br/>
  </div>)
}

const CountryInfo = ({ country, weather, weatherHandler }) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&units=metric&appid=API_KEY`

  useEffect(() => {
    axios.get(url)
      .then(response => {
        weatherHandler(response.data);
      })
  },[])

  const imgStyle = {
    maxWidth: "100px"
  };

  return (<div>
    <br />
    <img src={country.flag} style={imgStyle} alt={country.alpha2Code + '_flag'}/>
    <h1>{country.name}</h1>
    capital: {country.capital}<br />
    population: {country.population}
    <h2>languages</h2>
    {country.languages.map(l => l.name).map(name => <li key={name}>{name}</li>)}
    <h2>weather in {country.capital} now</h2>
    {weather.name ? <WeatherInfo weather={weather}/> : (<div>Loading...</div>)}
  </div>)
}

const CountryListing = ({ searchInput, selectHandler, weather, weatherHandler, data }) => {
  if (searchInput.length === 0) return (<div>Start searching for countries</div>)
  let countriesToList = data.filter(p => p.name.toLowerCase().includes(searchInput.toLowerCase()));
  if (countriesToList.length > 10) return (<div>Too many matches, specify another filter</div>)
  if (countriesToList.length === 1) return (<div><CountryInfo country={countriesToList[0]} weather={weather} weatherHandler={weatherHandler} /></div>)
  return countriesToList.map(c => (<div key={c.alpha2Code}>
    <li key={c.alpha2Code}>{c.name} <button name={c.name} type="submit" onClick={selectHandler}>show</button></li>
  </div>))
}

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchedName, setSearchedName] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/countries')
      .then(response => setCountryData(response.data));
  }, []);

  const handleSearch = (event) => setSearchedName(event.target.value);
  const handleSelect = (event) => setSearchedName(event.target.name);
  const handleWeather = (response) => setWeather(response);

  return (<div>
    <form>
      find countries: <input onChange={handleSearch} />
    </form>
    <CountryListing searchInput={searchedName} selectHandler={handleSelect}
      weather={weather} weatherHandler={handleWeather}
      data={countryData} />
  </div>)
}

export default App;
