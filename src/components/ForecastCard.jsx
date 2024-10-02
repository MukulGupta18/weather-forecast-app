import React from 'react';
import PropTypes from 'prop-types';
import './ForecastCard.css';

const ForecastCard = ({ day, temp_min, temp_max, icon, unit }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className="forecast-card">
      <h3>{day}</h3>
      <img src={iconUrl} alt="weather icon" />
      <p>
        {Math.round(temp_max)}° / {Math.round(temp_min)}°{unit === 'metric' ? 'C' : 'F'}
      </p>
    </div>
  );
};

ForecastCard.propTypes = {
  day: PropTypes.string.isRequired,
  temp_min: PropTypes.number.isRequired,
  temp_max: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
};

export default ForecastCard;