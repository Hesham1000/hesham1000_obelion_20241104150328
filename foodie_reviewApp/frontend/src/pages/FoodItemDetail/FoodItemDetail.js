import React, { useState } from 'react';
import './FoodItemDetail.css';
import axios from 'axios';

function FoodItemDetail() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    try {
      const response = await axios.get(`https://foodie_reviewApp-backend.cloud-stacks.com/api/v1/search`, {
        params: { query: e.target.value },
        headers: { 'Content-Type': 'application/json' },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleResultClick = (itemId) => {
    // Logic to navigate to the food item detail page
    window.location.href = `/food-item/${itemId}`;
  };

  return (
    <div className="food-item-detail">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a food item..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="search-results">
        {searchResults.map((item) => (
          <div
            key={item.id}
            className="search-result-item"
            onClick={() => handleResultClick(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodItemDetail;
