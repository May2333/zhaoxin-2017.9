const Sequelize = require('sequelize');
const config = require('../config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',//语言mysql
    pool: {
      max: 5,//最大连接数
      min: 0,
      idle: 30000 //一个线程30秒没有被使用的话，就释放线程
    }
  });

module.exports = sequelize;