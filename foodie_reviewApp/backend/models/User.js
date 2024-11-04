const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('foodie_reviewApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: false,
    });
  }

  static associate(models) {
    // Define associations here
  }
}

User.init(sequelize);

module.exports = User;