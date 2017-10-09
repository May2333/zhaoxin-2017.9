const Sequelize = require('sequelize');
var sequelize = require('./db-config');
var ChoiceTable = require('./ChoiceTable');
var EssayTable = require('./EssayTable');

var choice = async (ctx, next) => {
	var choice_show = await ChoiceTable.findAll({
		'limit': 5
	});
	var essay_show = await EssayTable.findAll();
	console.log(choice_show);
	ctx.render('choice.html', {
		name: ctx.cookies.get('name'),
		choice_show: choice_show,
		essay_show: essay_show
	});
}

module.exports = {
	'GET /zhaoxin/choice': choice
};

