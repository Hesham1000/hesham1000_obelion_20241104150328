import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://foodie_reviewApp-backend.cloud-stacks.com/api/v1/search', {
        params: { query },
        headers: { 'Content-Type': 'application/json' }
      });
      setResults(response.data);
      setError('');
    } catch (error) {
      setError('An error occurred while searching. Please try again.');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for food items..."
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {error && <div className="error-message">{error}</div>}
      <div className="search-results">
        {results.map((item) => (
          <div key={item.id} className="search-result-item" onClick={() => window.location.href = `/details/${item.id}`}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
