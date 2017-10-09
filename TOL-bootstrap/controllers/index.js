var index = async (ctx,next) => {
  ctx.render ('signin.html', {
    title: '--YF105答题系统--'
  })
};

module.exports = {
  'GET /zhaoxin': index
};
