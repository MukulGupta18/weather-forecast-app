import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css';

const predefinedCities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  // Add more cities as desired
];

const SearchInput = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [query, setQuery] = useState(''); // User input
  const [suggestions, setSuggestions] = useState(predefinedCities); // Filtered suggestions
  const [activeIndex, setActiveIndex] = useState(-1); // For keyboard navigation
  const modalRef = useRef(null); // Reference to the modal for detecting outside clicks

  // Filter suggestions based on the query
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions(predefinedCities);
    } else {
      const filtered = predefinedCities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
    setActiveIndex(-1); // Reset active index on new query
  }, [query]);

  // Handle clicking outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      } else if (query.trim() !== '') {
        handleSubmit();
      }
    }
  };

  // Handle selecting a city from suggestions
  const handleSelect = (city) => {
    onSearch(city);
    setIsOpen(false);
    setQuery('');
  };

  // Handle submitting a new city
  const handleSubmit = () => {
    onSearch(query.trim());
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="search-input-container">
      <button onClick={() => setIsOpen(!isOpen)} className="search-button">
        {isOpen ? 'Close Search' : 'Search City'}
      </button>
      {isOpen && (
        <div className="dropdown-modal" ref={modalRef}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name"
            className="search-box"
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((city, index) => (
                <li
                  key={city}
                  className={`suggestion-item ${
                    index === activeIndex ? 'active' : ''
                  }`}
                  onClick={() => handleSelect(city)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {city}
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-suggestions">No cities found.</div>
          )}
          {query.trim() !== '' && !suggestions.includes(query.trim()) && (
            <button onClick={handleSubmit} className="submit-button">
              Submit "{query.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchInput;