var chooses = document.querySelectorAll('.choose-div');
var signin = document.querySelector('#signin');
var register = document.querySelector('#register');
var a = document.querySelectorAll('a');

for (var i = 0; i < chooses.length; i++) {
(function(i) {
	chooses[i].addEventListener('click', function() {
		// 清除样式
		for (var index = 0; index < chooses.length; index++) {
			chooses[index].style.borderBottom = '';
			a[index].style.color = '#333';
		}
		// 下划线
		if (chooses[i].style.borderBottom=='') {
			chooses[i].style.borderBottom = '1px solid #009999';
			a[i].style.color = '#009999';
		}
		
		//变换内容
		if ( i == 0 ) {
			register.style.display = 'block';
			signin.style.display = 'none';
		} else {
			register.style.display = 'none';
			signin.style.display = 'block';
			
		}
		})
	})(i);
}
