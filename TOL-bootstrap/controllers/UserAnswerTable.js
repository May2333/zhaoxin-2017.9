const Sequelize = require('sequelize');
var sequelize = require('./db-config');

var UserAnswerTable = sequelize.define('user_answer', {
  stu_id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true
  },
  submit: Sequelize.INTEGER(1),
  1:Sequelize.STRING(1),
  2:Sequelize.STRING(1),
  3:Sequelize.STRING(1),
  4:Sequelize.STRING(1),
  5:Sequelize.STRING(1),
  6:Sequelize.STRING(1),
  7:Sequelize.STRING(1),
  8:Sequelize.STRING(1),
  9:Sequelize.STRING(1),
  10:Sequelize.STRING(1),
  11:Sequelize.STRING(200),
  12:Sequelize.STRING(200),
  13:Sequelize.STRING(200),
  14:Sequelize.STRING(200),
  15:Sequelize.STRING(200),
  16:Sequelize.STRING(200),
  17:Sequelize.STRING(200),

}, {
  timestamps: false,
  freezeTableName: true
  }
);



module.exports = UserAnswerTable;