import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { fetchCurrentWeather, fetchFiveDayForecast } from './api/weatherApi';
import usePullToRefresh from './hooks/usePullToRefresh';
import './App.css';

// Lazy load components
const CurrentWeather = lazy(() => import('./components/CurrentWeather'));
const Forecast = lazy(() => import('./components/Forecast'));
const SearchInput = lazy(() => import('./components/SearchInput'));
const ToggleUnit = lazy(() => import('./components/ToggleUnit'));
const ErrorMessage = lazy(() => import('./components/ErrorMessage'));

const DEFAULT_CITY = 'New York';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const App = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [unit, setUnit] = useState('metric');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const getWeatherData = useCallback(async (cityName, unitType) => {
    try {
      setError('');
      const weatherData = await fetchCurrentWeather(cityName, unitType);
      setCurrentWeather(weatherData);
      const forecastData = await fetchFiveDayForecast(cityName, unitType);
      setForecast(forecastData);
      const cachedData = {
        weatherData,
        forecastData,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(`weather_${cityName}_${unitType}`, JSON.stringify(cachedData));
      localStorage.setItem('lastCity', cityName);
      localStorage.setItem('unit', unitType);
    } catch (err) {
      setError(err.message);
      const cachedData = localStorage.getItem(`weather_${city}_${unit}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        if (currentTime - parsedData.timestamp < CACHE_DURATION) {
          setCurrentWeather(parsedData.weatherData);
          setForecast(parsedData.forecastData);
          setError('Displaying cached data due to an error fetching new data.');
        } else {
          localStorage.removeItem(`weather_${city}_${unit}`);
        }
      }
    }
  }, [city, unit]);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity') || DEFAULT_CITY;
    const savedUnit = localStorage.getItem('unit') || 'metric';
    setCity(lastCity);
    setUnit(savedUnit);

    const cachedData = localStorage.getItem(`weather_${lastCity}_${savedUnit}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - parsedData.timestamp < CACHE_DURATION) {
        setCurrentWeather(parsedData.weatherData);
        setForecast(parsedData.forecastData);
      } else {
        getWeatherData(lastCity, savedUnit);
      }
    } else {
      getWeatherData(lastCity, savedUnit);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'f') {
        setDarkMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [getWeatherData]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    getWeatherData(searchCity, unit);
  };

  const handleToggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    getWeatherData(city, newUnit);
  };

  const handleRefresh = () => {
    getWeatherData(city, unit);
  };

  usePullToRefresh(handleRefresh);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Weather Forecast Application</h1>
      <Suspense fallback={<div>Loading Search...</div>}>
        <SearchInput onSearch={handleSearch} />
      </Suspense>
      <Suspense fallback={<div>Loading Toggle...</div>}>
        <ToggleUnit unit={unit} onToggle={handleToggleUnit} />
      </Suspense>
      <button onClick={handleRefresh} className="refresh-button">
        Refresh
      </button>
      {error && (
        <Suspense fallback={<div>Loading Error Message...</div>}>
          <ErrorMessage message={error} />
        </Suspense>
      )}
      {currentWeather && (
        <Suspense fallback={<div>Loading Current Weather...</div>}>
          <CurrentWeather data={currentWeather} unit={unit} />
        </Suspense>
      )}
      {forecast.length > 0 && (
        <Suspense fallback={<div>Loading Forecast...</div>}>
          <Forecast forecast={forecast} unit={unit} />
        </Suspense>
      )}
    </div>
  );
};

export default App;