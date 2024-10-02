import React from 'react';
import PropTypes from 'prop-types';
import ForecastCard from './ForecastCard';
import './Forecast.css';

const Forecast = ({ forecast, unit }) => {
  return (
    <div className="forecast">
      {forecast.map((dayData, index) => (
        <ForecastCard key={index} {...dayData} unit={unit} />
      ))}
    </div>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.object).isRequired,
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
};

export default Forecast;