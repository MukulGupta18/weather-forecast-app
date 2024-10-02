import React from 'react';
import PropTypes from 'prop-types';
import './WeatherCondition.css';

const WeatherCondition = ({ condition }) => {
  return <p className="weather-condition">{condition}</p>;
};

WeatherCondition.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default WeatherCondition;