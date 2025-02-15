const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { type: DataTypes.STRING },
  socioEconomicStatus: { type: DataTypes.STRING },
  contactInfo: { type: DataTypes.STRING }
});

module.exports = User;
