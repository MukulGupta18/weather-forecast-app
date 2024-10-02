import React from 'react';
import PropTypes from 'prop-types';
import './Temperature.css';

const Temperature = ({ temp, unit }) => {
  return (
    <div className="temperature">
      {Math.round(temp)}°{unit === 'metric' ? 'C' : 'F'}
    </div>
  );
};

Temperature.propTypes = {
  temp: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
};

export default Temperature;