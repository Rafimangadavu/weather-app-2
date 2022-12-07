
import './App.css';

// import React from 'react'
// import Search from './components/search/search';

// const App = () => {

//  const handleOnSearchChange = (searchData) => {
//   console.log(searchData);
//  }


//   return (
//     <div className="container">
//       <Search onSearchChange={handleOnSearchChange}/>
//     </div>
//   )
// }

// export default App














































import Search from "./components/search/search"
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetcth = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetcth = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetcth, forecastFetcth])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });

      console.log(currentWeather);
      console.log(forecast);
  };
  return (
    <div className="container">
   
      <Search onSearchChange={handleOnSearchChange} /> 
       {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
 }

export default App;
