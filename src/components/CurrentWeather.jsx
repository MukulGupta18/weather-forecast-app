import React from 'react';
import PropTypes from 'prop-types';
import CityName from './CityName';
import Temperature from './Temperature';
import WeatherCondition from './WeatherCondition';
import WeatherIcon from './WeatherIcon';
import './CurrentWeather.css';

const CurrentWeather = ({ data, unit }) => {
  return (
    <div className="current-weather">
      <CityName name={data.name} />
      <WeatherIcon icon={data.weather[0].icon} />
      <Temperature temp={data.main.temp} unit={unit} />
      <WeatherCondition condition={data.weather[0].description} />
    </div>
  );
};

CurrentWeather.propTypes = {
  data: PropTypes.object.isRequired,
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
};

export default CurrentWeather;