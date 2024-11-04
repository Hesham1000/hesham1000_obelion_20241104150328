import React, { useState } from 'react';
import './FoodItemDetail.css';
import axios from 'axios';

function FoodItemDetail() {
  const [selectedFoodItem, setSelectedFoodItem] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);

  const handleFoodItemChange = (e) => {
    setSelectedFoodItem(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('https://foodie_reviewApp-backend.cloud-stacks.com/api/reviews', {
        foodItem: selectedFoodItem,
        rating: parseInt(rating),
        reviewText: review,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data.success) {
        alert('Review submitted successfully');
        setSelectedFoodItem('');
        setRating(0);
        setReview('');
      }
    } catch (error) {
      setError('Failed to submit review');
    }
  };

  return (
    <div className="food-item-detail">
      <h1>Submit Your Review</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="food-item">Select Food Item:</label>
          <select id="food-item" value={selectedFoodItem} onChange={handleFoodItemChange}>
            <option value="">--Select--</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Sushi">Sushi</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rate the Food Item:</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">Write Your Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default FoodItemDetail;
