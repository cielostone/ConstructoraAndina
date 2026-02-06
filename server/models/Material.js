const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    unit: {
        type: DataTypes.STRING, // e.g., 'UND', 'KG', 'M'
        defaultValue: 'UND'
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    criticalStock: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    }
});

module.exports = Material;
