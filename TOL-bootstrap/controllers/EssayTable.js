const Sequelize = require('sequelize');
var sequelize = require('./db-config');

var EssayTable = sequelize.define('essay_question', {
  essay_id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true
  },
  essay_question: Sequelize.STRING(255),
}, {
  timestamps: false,
  freezeTableName: true
  }
);

module.exports = EssayTable;