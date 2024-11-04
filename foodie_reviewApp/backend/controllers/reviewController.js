const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db', // Ensure the database host configuration is set to 'db'
  dialect: 'mysql',
});

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  foodItem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Review;

const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  const { foodItem, rating, reviewText } = req.body;

  try {
    const review = await Review.create({
      foodItem,
      rating,
      reviewText,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: error.message,
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: error.message,
    });
  }
};

exports.getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch review',
      error: error.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { foodItem, rating, reviewText } = req.body;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review.foodItem = foodItem;
    review.rating = rating;
    review.reviewText = reviewText;
    await review.save();

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: error.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    await review.destroy();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: error.message,
    });
  }
};