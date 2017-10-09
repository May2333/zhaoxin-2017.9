const Sequelize = require('sequelize');
var sequelize = require('./db-config');

var ChoiceTable = sequelize.define('choice_question', {
  choice_id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true
  },
  user_id: Sequelize.INTEGER(11),
  choice_question: Sequelize.STRING(255),
  A: Sequelize.STRING(255),
  B: Sequelize.STRING(255),
  C: Sequelize.STRING(255),
  D: Sequelize.STRING(255),
  answer: Sequelize.STRING(10)
}, {
  timestamps: false,
  freezeTableName: true
  }
);

module.exports = ChoiceTable;