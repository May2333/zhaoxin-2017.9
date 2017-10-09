var btns = document.querySelectorAll('.btns');
// var submit = document.querySelector('.submit');
var back = document.querySelector('#back');
var save = document.querySelector('#save');
var blank = document.querySelector('.blank');

var index = 0; //页数,从0开始

for (var btn_index = 0; btn_index <2; btn_index++) {
	(function(btn_index) {
		btns[btn_index].addEventListener('click', function() {

			if(btn_index) {
				index++;
			}
			else {
				if (!index) {
					index = 0;
				} else {
				index--;}
			}

			if(!index) { //非第一页就显示“继续”
				back.style.display = 'none';
			} else {
				back.style.display = 'inline-block';
				save.style.display = 'inline-block';
				save.value = '进入下一页';
			}

			var message = 'index=' + index;

			if (document.querySelector('.choose_a')) {
				var choose_a = document.querySelectorAll('.choose_a');
				var choose_b = document.querySelectorAll('.choose_b');
				var choose_c = document.querySelectorAll('.choose_c');
				var choose_d = document.querySelectorAll('.choose_d');

				for (var radio_index=0;radio_index<choose_a.length;radio_index++) {
					if (choose_a[radio_index].checked) {
						message = message + '&' + choose_a[radio_index].name + '=' + choose_a[radio_index].value;
					} else if (choose_b[radio_index].checked) {
						message = message + '&' + choose_b[radio_index].name + '=' + choose_b[radio_index].value;
					} else if (choose_c[radio_index].checked) {
						message = message + '&' + choose_c[radio_index].name + '=' + choose_c[radio_index].value;
					} else if (choose_d[radio_index].checked) {
						message = message + '&' + choose_d[radio_index].name + '=' + choose_d[radio_index].value;
					}
				}
				message = message + '&first=' + choose_a[0].name + '&last=' + choose_a[radio_index-1].name;
			}

			// console.log(document.querySelector('textarea'));
			if (document.querySelector('textarea')) {
				var text_blank = document.querySelectorAll('textarea');
				// console.log(text_blank[1].value);
				for(var text_index=0;text_index<text_blank.length;text_index++) {
					if (text_blank[text_index].value) {
						message = message + '&' + text_blank[text_index].name + '=' + text_blank[text_index].value;
						// console.log(message);
					}
				}
				message = message + '&first=' + text_blank[0].name + '&last=' + text_blank[text_index-1].name;

			}
			
			console.log(document.querySelector('.overFlag'));
			if(document.querySelector('.overFlag')) {// 时间到禁止答题
				blank.innerHTML = '';

				var newNodeSubmit = document.createElement('p');
				newNodeSubmit.innerHTML = '时间已到，您已被禁止答题';
				blank.appendChild(newNodeSubmit);

				var timeTips = document.createElement('p');
				timeTips.style.display = 'inline-block';
				blank.appendChild(timeTips);
				var closeA = document.createElement('a');
				closeA.innerHTML = '关闭答题页面';
				closeA.style.display = 'inline-block';
				closeA.href = "javascript:window.location.href = 'about:blank';window.close()";
				// closeA.href = `javascript:window.open(",'_self',");window.close()`;
				blank.appendChild(closeA);

				var time5s = 5;//5s
				function countLeftTime(){
					var timeLeft = parseInt(time5s);
					timeTips.innerHTML = '还有' + timeLeft + '秒即将';

					time5s--;
					// console.log(time5s);
					if (timeLeft==0) {
					// if (timeLeft==4) {
						window.location.href = 'about:blank';
						window.top.opener=null;
						window.close();
						return;
					}
					setTimeout(countLeftTime,1000); 
				}

				countLeftTime();
				

				back.style.display = 'none';
				save.style.display = 'none';
				message = message + '&over=1';
			}
			var next_request = new XMLHttpRequest();

			next_request.open('POST', "/zhaoxin/choice", true);
			next_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');

			console.log(message);
			next_request.send(message);

			next_request.onreadystatechange = function() {
				if (next_request.readyState === 4 && next_request.status === 200) {
					// console.log(next_request.responseText);
					var obj = JSON.parse(next_request.responseText);

					if(document.querySelector('.overFlag')) {
						return;
					}


					if (obj.mode=='choice') { //选择题

						blank.innerHTML = '';
						var title = document.createElement('h2');
						title.innerHTML = ' 第一部分 选择题';
						blank.appendChild(title);

						for(var i = 0; i < obj.choice_show.length; i++) {
					
								var questionSum = index*5+i+1; //问题第quesionSum个
								var question = document.createElement('h3');
								question.innerHTML = obj.choice_show[i].choice_id + '.' + obj.choice_show[i].choice_question;
								blank.appendChild(question);

								var newNode1 = document.createElement('input');
								newNode1.type = 'radio';
								newNode1.name = obj.choice_show[i].choice_id;
								newNode1.value = 'A';
								newNode1.className = 'choose_a';
								blank.appendChild(newNode1);
								var choiceAText = document.createElement('span');
								choiceAText.innerHTML = 'A.' + obj.choice_show[i]['A'];
								blank.appendChild(choiceAText);
								var enter1 = document.createElement('div');
								blank.appendChild(enter1);

								var newNode2 = document.createElement('input');
								newNode2.type = 'radio';
								newNode2.name = obj.choice_show[i].choice_id;
								newNode2.value = 'B';
								newNode2.className = 'choose_b';
								blank.appendChild(newNode2);
								var choiceBText = document.createElement('span');
								choiceBText.innerHTML = 'B.' + obj.choice_show[i]['B'];
								blank.appendChild(choiceBText);
								var enter2 = document.createElement('div');
								blank.appendChild(enter2);

								var newNode3 = document.createElement('input');
								newNode3.type = 'radio';
								newNode3.name = obj.choice_show[i].choice_id;
								newNode3.value = 'C';
								newNode3.className = 'choose_c';
								blank.appendChild(newNode3);
								var choiceCText = document.createElement('span');
								choiceCText.innerHTML = 'C.' + obj.choice_show[i]['C'];
								blank.appendChild(choiceCText);
								var enter3 = document.createElement('div');
								blank.appendChild(enter3);

								var newNode4 = document.createElement('input');
								newNode4.type = 'radio';
								newNode4.name = obj.choice_show[i].choice_id;
								newNode4.value = 'D';
								newNode4.className = 'choose_d';
								blank.appendChild(newNode4);
								var choiceDText = document.createElement('span');
								choiceDText.innerHTML = 'D.' + obj.choice_show[i]['D'];
								blank.appendChild(choiceDText);
								var enter4 = document.createElement('div');
								blank.appendChild(enter4);

								if (obj.answer_show[0]) {
									switch (obj.answer_show[0][questionSum]) {
										case 'A': {
											newNode1.checked = true;
										} break;
										case 'B': {
											newNode2.checked = true;
										} break;
										case 'C': {
											newNode3.checked = true;
										} break;
										case 'D': {
											newNode4.checked = true;
										} break;
									}
								}
								
						}
					} else if (obj.mode=='essay'){
									blank.innerHTML = '';
									var title = document.createElement('h2');
									title.innerHTML = ' 第二部分 问答题';
									blank.appendChild(title);
								// console.log(obj.answer_show);
								// console.log(obj);
								if(obj.offset=='last') {//如果到最后一页，就让"继续"按钮变成"提交"
									// save.style.display = 'none';
									save.value = '提交答案';
								} else {
									save.style.display = 'inline-block';
								} 
								if (obj.essay_show.length) {
									for (var i = 0;i < obj.essay_show.length;i++) {
										var newNode = document.createElement('h3');
										newNode.innerHTML = obj.essay_show[i].essay_id + '.' + obj.essay_show[i].essay_question;
										blank.appendChild(newNode);
										var text = document.createElement('textarea');
										text.name = obj.essay_show[i].essay_id;
										text.className = 'textarea';
										// console.log(obj.answer_show[0][obj.essay_show[i].essay_id]);
										if (obj.answer_show[0]) {
											if(obj.answer_show[0][obj.essay_show[i].essay_id]) {
												text.value = obj.answer_show[0][obj.essay_show[i].essay_id];
											}
										}
										
										
										blank.appendChild(text);
									}

								} else {
									blank.innerHTML = '';
									var newNodeSubmit = document.createElement('p');
									newNodeSubmit.innerHTML = '提交成功';
									blank.appendChild(newNodeSubmit);

									var timeTips = document.createElement('p');
									timeTips.style.display = 'inline-block';
									blank.appendChild(timeTips);
									var closeA = document.createElement('a');
									closeA.innerHTML = '关闭答题页面';
									closeA.style.display = 'inline-block';
									closeA.href = "javascript:window.location.href = 'about:blank';window.close()";
									// closeA.href = `javascript:window.open(",'_self',");window.close()`;
									blank.appendChild(closeA);
									var time5s = 5;//5s
									function countLeftTime(){
										var timeLeft = parseInt(time5s);
										timeTips.innerHTML = '还有' + timeLeft + '秒即将';

										time5s--;
										// console.log(time5s);
										if (timeLeft==0) {
										// if (timeLeft==4) {
											window.location.href = 'about:blank';
											window.top.opener=null;
											window.close();
											return;
										}
										setTimeout(countLeftTime,1000); 
									}

									countLeftTime();
									
									back.style.display = 'none';
									save.style.display = 'none';

								}
								
								
							}
				}
			}
		})
	})(btn_index);
}

function timeLeftTips() {

}
