import React, { useState } from 'react';
import axios from 'axios';
import './ReviewSubmission.css';

function ReviewSubmission() {
  const [foodItem, setFoodItem] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://foodie_reviewApp-backend.cloud-stacks.com/api/reviews', {
        foodItem,
        rating,
        reviewText,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccessMessage('Review submitted successfully!');
    } catch (error) {
      setErrorMessage('Failed to submit review: ' + error.response.data.message);
    }
  };

  return (
    <div className="review-submission">
      <h2>Submit Your Review</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="food-item">Select Food Item:</label>
          <select
            id="food-item"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          >
            <option value="">Choose an item</option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="sushi">Sushi</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rate the Food:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="review-text">Write Your Review:</label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="5"
          ></textarea>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewSubmission;
