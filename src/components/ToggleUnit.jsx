import React from 'react';
import PropTypes from 'prop-types';
import './ToggleUnit.css';

const ToggleUnit = ({ unit, onToggle }) => {
  return (
    <div className="toggle-unit">
      <span className={unit === 'metric' ? 'active' : ''}>°C</span>
      <label className="switch">
        <input type="checkbox" onChange={onToggle} checked={unit === 'imperial'} />
        <span className="slider round"></span>
      </label>
      <span className={unit === 'imperial' ? 'active' : ''}>°F</span>
    </div>
  );
};

ToggleUnit.propTypes = {
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleUnit;