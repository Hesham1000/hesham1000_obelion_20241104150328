const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users/:email', getUser);
router.put('/users/:email', updateUser);
router.delete('/users/:email', deleteUser);

module.exports = router;

// Assume this is part of a database configuration or model file
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db', // Updated from 'localhost' to 'db'
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users', // Ensure the model name matches the database table
  timestamps: false,
});

module.exports = User;