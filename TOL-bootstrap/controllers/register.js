const Sequelize = require('sequelize');
var sequelize = require('./db-config');
var LoginTable = require('./LoginTable');

var register = async (ctx, next) => {
	var name = ctx.request.body.name,
		password = ctx.request.body.password;
	var passwordd = await LoginTable.findAll({
		where: {
			password: password
		}
	});
	if(passwordd.length) {
		ctx.response.type = 'text/html';
		ctx.response.body = '<p>您已报名！</p>'
	} else {
		var user = await LoginTable.create({
			name: name,
			password: password
		});	
		
		ctx.response.type = 'text/html';
		ctx.response.body = `<p>${name},恭喜完成注册!<br>请于XXXX年xx月xx日xx时xx分准时登录进行在线答题!</p>`;
	}

	
}

module.exports = {
	'POST /zhaoxin/register' : register
};
