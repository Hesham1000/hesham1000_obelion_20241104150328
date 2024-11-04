const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('foodie_reviewApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
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
  tableName: 'Users',
  timestamps: false,
});

async function createUser(req, res) {
  const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function getUser(req, res) {
  const { email } = req.params;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

async function updateUser(req, res) {
  const { email } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      user.password = password;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function deleteUser(req, res) {
  const { email } = req.params;
  try {
    const result = await User.destroy({ where: { email } });
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};