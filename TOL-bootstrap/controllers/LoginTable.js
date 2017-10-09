const Sequelize = require('sequelize');
var sequelize = require('./db-config');

var LoginTable = sequelize.define('login', {
  id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true
  },
  name: Sequelize.STRING(20),
  password: Sequelize.INTEGER(10),
}, {
  timestamps: false,
  freezeTableName: true
  }
);



module.exports = LoginTable;