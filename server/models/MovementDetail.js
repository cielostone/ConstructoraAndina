const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MovementDetail = sequelize.define('MovementDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    }
});

module.exports = MovementDetail;
