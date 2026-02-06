const sequelize = require('../config/database');
const User = require('./User');
const Worker = require('./Worker');
const Material = require('./Material');
const Movement = require('./Movement');
const MovementDetail = require('./MovementDetail');

// Associations

// User records Movements
User.hasMany(Movement, { foreignKey: 'userId' });
Movement.belongsTo(User, { foreignKey: 'userId' });

// Worker receives items (for Assignments)
Worker.hasMany(Movement, { foreignKey: 'workerRut' });
Movement.belongsTo(Worker, { foreignKey: 'workerRut' });

// Movement has many details
Movement.hasMany(MovementDetail, { foreignKey: 'movementId', onDelete: 'CASCADE' });
MovementDetail.belongsTo(Movement, { foreignKey: 'movementId' });

// Detail refers to a Material
Material.hasMany(MovementDetail, { foreignKey: 'materialSku' });
MovementDetail.belongsTo(Material, { foreignKey: 'materialSku' });

module.exports = {
    sequelize,
    User,
    Worker,
    Material,
    Movement,
    MovementDetail
};
