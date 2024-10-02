import React from 'react';
import PropTypes from 'prop-types';
import './WeatherIcon.css';

const WeatherIcon = ({ icon }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return <img src={iconUrl} alt="weather icon" className="weather-icon" />;
};

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default WeatherIcon;