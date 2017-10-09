var btns = document.querySelectorAll('.submit-btn');

for (var i = 0; i < btns.length; i++) {
	(function(i){
		btns[i].addEventListener ('click', function (){
			// alert(`${i}`);
			var request = new XMLHttpRequest();

			if (i == 0) { //register
				var name = document.querySelector('[name = name-register]').value;
				var password1 = document.querySelector('[name = password-register1]').value;
				var password2 = document.querySelector('[name = password-register2]').value;
				var name_err = document.querySelector('.name-err-register');
				var password_err1 = document.querySelector('.password-err-register1');
				var password_err2 = document.querySelector('.password-err-register2');
				
				request.open("POST", "/zhaoxin/register",true);
				request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');

				//判断输入字符串是否正确
				if ( !name ) {
					name_err.innerHTML = '姓名不能为空!';
					return;
				} else {
					name_err.innerHTML = '';
				}

				if ( !password1 ) {
					password_err1.innerHTML = '学号不能为空！';
					return;
				} else if ( password1.length != 10 || !(/^\d+$/.test(password1))) {
					password_err1.innerHTML = '请输入正确的学号！'
					return;
				} else {
					password_err1.innerHTML = '';
				}

				if (!password2 ) {
					password_err2.innerHTML = '学号不能为空！';
					return;
				} else if (password1 != password2) {
					password_err2.innerHTML = '两次密码不相同！';
					return;
				} else {
					var password = password1;
					password_err2.innerHTML = '';
				}

			} else {  //login
				var name = document.querySelector('[name = name-login]').value;
				var password = document.querySelector('[name = password-login]').value;
				var name_err = document.querySelector('.name-err-login');
				var password_err = document.querySelector('.password-err-login');

				request.open("POST", "zhaoxin/login",true);
				request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');

				if (!name) {
					name_err.innerHTML = '姓名不能为空!';
					return;
				} else {
					name_err.innerHTML = '';
				}
				
			}

			// password_err.innerHTML = 'hh';
			// alert(`${name},${password}`);
			request.send("name="+name+"&password="+password);

			request.onreadystatechange = function() {
				if(request.readyState === 4 && request.status === 200) {
					//...
					// alert(request.responseText);
					if (i == 0) {//register
						password_err2.innerHTML = request.responseText;

					} else {//login
						if (request.responseText==='<p>用户名或密码错误！</p>') {
							password_err.innerHTML = request.responseText;
						} else if (request.responseText==='<p>您已答题！</p>'){
							password_err.innerHTML = request.responseText;
						} else {
							window.location.href = '/zhaoxin/homepage';
						}
						
					}
				}
			}
			})
		} 
	)(i);
};
