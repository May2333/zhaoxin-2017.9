const Sequelize = require('sequelize');
var sequelize = require('./db-config');
var ChoiceTable = require('./ChoiceTable');
var EssayTable = require('./EssayTable');
var LoginTable = require('./LoginTable');
var UserAnswerTable = require('./UserAnswerTable');
// var idFlag = 0; //是否插入该用户一行信息

var choice_refresh = async (ctx, next) => {
	var stuNum = ctx.cookies.get('stuNum');
	stuNum = parseInt(stuNum); //字符串转换为数字
	var index = ctx.request.body.index;
	var first = parseInt(ctx.request.body.first);
	var last = parseInt(ctx.request.body.last);
	if (ctx.request.body.over) {
		var overFlag = parseInt(ctx.request.body.over);
		// console.log(overFlag);
	}

	// console.log(first);
	// console.log(last);
	var questions = new Array();

	var user = await UserAnswerTable.findOne({
		'where': {
			stu_id: stuNum,
		}
	})
	if (!user) {
		var userIdSubmit = await UserAnswerTable.create({
			stu_id: stuNum,
		});//添加该学号的记录
	}
	// console.log(ctx.request.body);

	for(var questionIndex = first; questionIndex <= last; questionIndex++) {
		// console.log('hhh');
		questions[questionIndex] = ctx.request.body[questionIndex];//获取答案
		if (questions[questionIndex]) { //如果答案有效
			var questionId = questionIndex;//获取问题序号
		
			var submitValues = {};
			submitValues[questionId] = questions[questionIndex];
			var userAnswerSubmit = await UserAnswerTable.update(submitValues,{
				where: {
					stu_id: stuNum
				}
			}); //更新用户的答案
		}
	}
	
	var chioce_sum = await ChoiceTable.findAll();
	chioce_sum = chioce_sum.length; //选择题总个数
	var essay_sum = await EssayTable.findAll();
	essay_sum = essay_sum.length; //问答题个数

	if (last==chioce_sum+essay_sum || overFlag==1) {
		await UserAnswerTable.update({
			'submit': 1
		}, {
			'where': {
				stu_id: stuNum
			}
		})
	} //最后一个问题提交

	var choice_show = await ChoiceTable.findAll({
		where: {
					choice_id: {'$between': [index*5+1, index*5+5]},
				}
		
	}); //查找下一页选择题的内容

	var answer_show = await UserAnswerTable.findAll({
		where: {
					stu_id: stuNum
		}
	}); //查找所有该用户的答题信息


	if (!choice_show.length) { //选择题显示完成，返回问答题
		var mode = 'essay';
		var essay_show = await EssayTable.findAll({
		'where': {'essay_id': {'$between': [index*5+1, index*5+2]}} ,
		'where': {'essay_id': {'$between': [chioce_sum+(index-chioce_sum/5)*2+1, chioce_sum+(index-chioce_sum/5)*2+2]}} 

		});
		var offset = 'last'; //最后一页显示
		// console.log(chioce_sum+(index-chioce_sum/5)*2+2);
		// console.log(essay_sum+chioce_sum);
		//所有题目显示完成,返回offset=last,并且将表显示为已提交
		if ((chioce_sum+(index-chioce_sum/5)*2+1 == essay_sum+chioce_sum) || (chioce_sum+(index-chioce_sum/5)*2+2 == essay_sum+chioce_sum || overFlag==1)) {
			var essayValueShow = {offset, mode, answer_show, essay_show};
		} else {
			var essayValueShow = {mode, answer_show, essay_show};
		}
		var essayValueJson = JSON.stringify(essayValueShow);
		ctx.response.type = 'text/html';
		ctx.response.body = essayValueJson;
	} else if (!essay_show) { //选择题未完成，返回选择题
		var mode = 'choice';
		var choiceValueShow = {mode, answer_show, choice_show};
		var choiceValueJson = JSON.stringify(choiceValueShow);
		ctx.response.type = 'text/html';
		ctx.response.body = choiceValueShow;
	}
}

module.exports = {
	'POST /zhaoxin/choice' : choice_refresh
};