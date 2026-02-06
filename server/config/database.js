const { Sequelize } = require('sequelize');
const path = require('path');

// Database file path (in the root database folder)
const dbPath = path.resolve(__dirname, '../../database/inventory.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
