const sequelize = require('../database');
const User = require('./user');
const Scheme = require('./scheme');
const Application = require('./application');
const Grievance = require('./grievance');

// Define relationships
User.hasMany(Application);
Application.belongsTo(User);

Scheme.hasMany(Application);
Application.belongsTo(Scheme);

User.hasMany(Grievance);
Grievance.belongsTo(User);

Scheme.hasMany(Grievance);
Grievance.belongsTo(Scheme);

module.exports = { sequelize, User, Scheme, Application, Grievance };