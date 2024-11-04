const express = require('express');
const router = express.Router();
const { searchFoodItems } = require('../controllers/searchController');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('foodie_reviewApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const results = await searchFoodItems(query, sequelize);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
