// src/api/weatherApi.js
const API_KEY = "330b37423e20fb205d780d0a72352b9a";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city, unit = 'metric', lang = 'en') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&lang=${lang}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchFiveDayForecast = async (city, unit = 'metric', lang = 'en') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&lang=${lang}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    const data = await response.json();
    // Process data to get daily forecasts
    const dailyData = processForecastData(data);
    return dailyData;
  } catch (error) {
    throw error;
  }
};

const processForecastData = (data) => {
  const daily = {};

  data.list.forEach((entry) => {
    const date = new Date(entry.dt_txt);
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });

    if (!daily[day]) {
      daily[day] = {
        temp_min: entry.main.temp_min,
        temp_max: entry.main.temp_max,
        icon: entry.weather[0].icon,
      };
    } else {
      daily[day].temp_min = Math.min(daily[day].temp_min, entry.main.temp_min);
      daily[day].temp_max = Math.max(daily[day].temp_max, entry.main.temp_max);
    }
  });

  // Convert daily object to an array and exclude the first day if it's the current day
  const forecastArray = Object.keys(daily).map((day) => ({
    day,
    ...daily[day],
  }));

  return forecastArray.slice(0, 5); // Return only next 5 days
};