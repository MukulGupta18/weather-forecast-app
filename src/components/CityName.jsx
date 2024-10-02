import React from 'react';
import PropTypes from 'prop-types';
import './CityName.css';

const CityName = ({ name }) => {
  return <h2 className="city-name">{name}</h2>;
};

CityName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CityName;