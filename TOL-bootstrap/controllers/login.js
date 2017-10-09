const Sequelize = require('sequelize');
var sequelize = require('./db-config');
var LoginTable = require('./LoginTable');
var UserAnswerTable = require('./UserAnswerTable');

var login = async (ctx, next) => {

	var name = ctx.request.body.name,
		password = ctx.request.body.password;

	var submit = await UserAnswerTable.findOne({
		'attributes': ['submit'],
		'where': {
			'stu_id': password
		}
	})
	console.log(submit);
	var passwordIndb = await LoginTable.findOne({
		'attributes': ['password'],
		'where': {
			'name': name
		}
	});

	if (passwordIndb['password'] != password) {
		ctx.response.type = 'text/html';
		ctx.response.body = `<p>用户名或密码错误！</p>`;
		return;
	} else {
		// console.log(submit['submit']==1);
		if (submit) {
			if (submit['submit']) {
				console.log('hhh');
				ctx.response.type = 'text/html';
				ctx.response.body = `<p>您已答题！</p>`;
				return;
			}
		} else {
			ctx.response.type = 'text/html';
			ctx.response.body = "ok";
			ctx.cookies.set('name', new Buffer(name).toString('base64'));
			ctx.cookies.set('stuNum',password);
		}
	
		
	}
	

}

module.exports = {
	'POST /zhaoxin/login' : login
};