var homepage = async (ctx, next) => {
	var nameBase64 = ctx.cookies.get('name');
	var name = new Buffer(nameBase64,'base64').toString();
	ctx.render ('homepage.html', {
		title: '--YF105答题系统--',
		name: name
	})
};

module.exports = {
	'GET /zhaoxin/homepage': homepage
};