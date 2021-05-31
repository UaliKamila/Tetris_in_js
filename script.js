let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', function (e) {
	if (e.target.classList.contains('easy')) {
		speed = 1000;
	} else if (e.target.classList.contains('normal')) {
		speed = 500;
	} else if (e.target.classList.contains('hard')) {
		speed = 200;
	}

	//если выбрали сложность, то должна начаться игра и модалка исчезает
	if (e.target.classList.contains('button')) {
		modal.style.display = 'none';
		overlay.style.display = 'none';
		StartGame();
	}
})

function StartGame() {

let tetris = document.createElement('div');
tetris.classList.add('tetris'); /*добавляем divу класс тетрис с сss */

/*заполняем тетрис ячейками, 180итерации должно быть */
for (let i=1; i<181; i++) { 
	let excel = document.createElement('div');
	excel.classList.add('excel');
	tetris.appendChild(excel); /*добавляем тетрис 180ячеек */
}

/*должно появится на странице */
let main = document.getElementsByClassName('main')[0];/*0 первый элемент */
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');/*записались 180ячеек */
let i = 0;

/*пройдемся по всем рядам тетриса, начиная с последнего*/
for (let y=18; y>0; y--) {
	for (let x=1; x<11; x++) {/*пройдемся по оси х */
		excel[i].setAttribute('posX', x); /*пройдемся по верхнему ряду и запишем всем ячейкам координаты 1*18,2*18 итд до 10*18 */
		excel[i].setAttribute('posY', y);/*как цикл закончится,обратимся к 17ряду и повторим до первого ряда */
		i++;
	}
}

/*координаты первой ячейки каждой фигуры 10 по оси у и 5 по оси х,координаты остальных трех ячеек привязываем к коррдинатом к первой ячейки */
let x = 5, y = 15; /*первый элемент каждой фигуры будет занимать эту ячейку с кординатами 5*10 для наглядности */
let mainArr = [ //в массиве логика прорисовки и логика поворота каждой фигуры
	//фигура палки
	[
		[0, 1], //1й элемент поалочного массива
		[0, 2], //2й элемент поалочного массива
		[0, 3], //3й элемент поалочного массива
		//поворот на 90 градусов (1я ячейка)
		[ //4й элемент поалочного массива
			[-1, 1], 
			[0, 0],
			[1, -1],
			[2, -2]
		],
		//поворот на 180 градусов (2я ячейка)
		[ //5й элемент поалочного массива
			[1, -1], 
			[0, 0],
			[-1, 1],
			[-2, 2]
		],
		//поворот на 270 градусов (3я ячейка)
		[ //6й элемент поалочного массива
			[-1, 1],
			[0, 0],
			[1, -1],
			[2, -2]
		],
		//поворот на 360 градусов (4я ячейка)
		[ //7й элемент поалочного массива
			[1, -1],
			[0, 0],
			[-1, 1],
			[-2, 2]
		],
	],

	//фигура квадрата
	[
		[1, 0],
		[0, 1],
		[1, 1],
		//поворот на 90 градусов (1я ячейка)
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0]
		],
		//поворот на 180 градусов (2я ячейка)
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0]
		],
		//поворот на 270 градусов (3я ячейка)
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0]
		],
		//поворот на 360 градусов (4я ячейка)
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0]
		],
	],
	
	//фигура буквы L
	[
		[1, 0],
		[0, 1],
		[0, 2],
		//поворот на 90 градусов (1я ячейка)
		[
			[0, 0],
			[-1, 1],
			[1, 0],
			[2, -1]
		],
		//поворот на 180 градусов (2я ячейка)
		[
			[1, -1],
			[1, -1],
			[-1, 0],
			[-1, 0]
		],
		//поворот на 270 градусов (3я ячейка)
		[
			[-1, 0],
			[0, -1],
			[2, -2],
			[1, -1]
		],
		//поворот на 360 градусов (4я ячейка)
		[
			[0, -1],
			[0, -1],
			[-2, 0],
			[-2, 0]
		],
	],
		
	//фигура зеркальной буквы L
	[
		[1, 0],
		[1, 1],
		[1, 2],
		//поворот на 90 градусов (1я ячейка)
		[
			[0, 0],
			[0, 0],
			[1, -1],
			[-1, -1]
		],
		//поворот на 180 градусов (2я ячейка)
		[
			[0, -1],
			[-1, 0],
			[-2, 1],
			[1, 0]
		],
		//поворот на 270 градусов (3я ячейка)
		[
			[2, 0],
			[0, 0],
			[1, -1],
			[1, -1]
		],
		//поворот на 360 градусов (4я ячейка)
		[
			[-2, 0],
			[1, -1],
			[0, 0],
			[-1, 1]
		],
	],
	

	//фигура буквы Z
	[
		[1, 0],
		[-1, 1],
		[0, 1],
		//поворот на 90 градусов (1я ячейка)
		[
			[0, -1],
			[-1, 0],
			[2, -1],
			[1, 0]
		],
		//поворот на 180 градусов (2я ячейка)
		[
			[0, 0],
			[1, -1],
			[-2, 0],
			[-1, -1]
		],
		//поворот на 270 градусов (3я ячейка)
		[
			[0, -1],
			[-1, 0],
			[2, -1],
			[1, 0]
		],
		//поворот на 360 градусов (4я ячейка)
		[
			[0, 0],
			[1, -1],
			[-2, 0],
			[-1, -1]
		],
	],

	//фигура зеркальной буквы Z
	[
		[1, 0],
		[1, 1],
		[2, 1],
		//поворот на 90 градусов (1я ячейка)
		[
			[2, -1],
			[0, 0],
			[1, -1],
			[-1, 0]
		],
		//поворот на 180 градусов (2я ячейка)
		[
			[-2, 0],
			[0, -1],
			[-1, 0],
			[1, -1]
		],
		//поворот на 270 градусов (3я ячейка)
		[
			[2, -1],
			[0, 0],
			[1, -1],
			[-1, 0]
		],
		//поворот на 360 градусов (4я ячейка)
		[
			[-2, 0],
			[0, -1],
			[-1, 0],
			[1, -1]
		],
	],

	//еще одна фигура 
	[
		[1, 0],
		[2, 0],
		[1, 1],
		//поворот на 90 градусов (1я ячейка)
		[
			[1, -1],
			[0, 0],
			[0, 0],
			[0, 0]
		],
		//поворот на 180 градусов (2я ячейка)
		[
			[0, 0],
			[-1, 0],
			[-1, 0],
			[1, -1]
		],
		//поворот на 270 градусов (3я ячейка)
		[
			[1, -1],
			[1, -1],
			[1, -1],
			[0, 0]
		],
		//поворот на 360 градусов (4я ячейка)
		[
			[-2, 0],
			[0, -1],
			[0, -1],
			[-1, -1]
		],
	],
]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1; //отслеживает состояние поворота фигуры

function create() {
	function getRandom() { //случайный выбор придет из разных фигур
		return Math.round(Math.random()*(mainArr.length-1)) //умножим на длину главного массива
	}

	rotate = 1; //при создании новой фигуры отбрасывается на 1
	currentFigure = getRandom(); //то что выдаст функция запишется в currentFigure

	figureBody = [ //запишем 4соседние ячейки на тетрис поле
		document.querySelector(`[posX = "${x}"][posY = "${y}"]`), //posX=5 posY=10
		
		//x обращаемся к 1элементу в 1массиве, y обращаемся к 2элементу в 1массиве
		document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
		//обращаемся к второму массиву
		document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
		//обращаемся к третьему массиву
		document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
	]

	for (let i=0; i<figureBody.length; i++) { //все новые фигуры в классе figure
		figureBody[i].classList.add('figure');
	}
}
create();

let score = 0;
let input = document.getElementsByTagName('input')[0];
input.value = `Ваши очки: ${score}`;

//логика падения фигур
function move() {
	let moveFlag = true; 
	/*если true позволит двигаться еще на один ряд вниз, 
	если false то остановит движение детали и зафиксирует ее положение в пространстве 
	и создает новую фигуру которая также будет падать до какого-то логич момента(те когда достигнет нижнего ряда,
	либо когда наткнется на другие фигуры, которые упали до неё)*/
	let coordinates = [ //создали фигуру,записали в нее 4соседние ячейки и укаждой ячейки есть свои координаты
		[figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')], //5 15
		[figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')], //5 16
		[figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')], //5 17
		[figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')], //5 18
	];

	/*Условие! Не может падать -
1.если достигла дна поля
2.если достигла нагромождения какой-то фигуры который упал до нее */
		for (let i = 0; i < 	coordinates.length; i++) {
			/*ищем 2ой элемент,если posY=1 значит фигура находится на самом нижнем ряду поля
			или обращаемся к ячейки которая лежит этажом ниже и спрашиваем есть ли клас 'set', если да то останавливаем движение, если нет то можем падать дальше*/
			if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) { 
				moveFlag = false;
				break;
			}
		}

		//если движение вниз возможно, то нужно избавить фигуру от класа figure
		if (moveFlag) {
			for (let i = 0; i < figureBody.length; i++) { 
				figureBody[i].classList.remove('figure');
			}
			//перезаписываем координаты, они сдвинулись на одну ячейку вниз
			figureBody = [
				document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
				document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
				document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
				document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
			];
			for (let i = 0; i < figureBody.length; i++) { 
				figureBody[i].classList.add('figure');
			}
		} else { //если moveFlag будет false, то запретим дальнейшее движение вниз
			for (let i = 0; i < figureBody.length; i++) { 
				figureBody[i].classList.remove('figure');
				figureBody[i].classList.add('set'); //добавляем класс set
			} 
/*Логика игры - 
если на поле есть полность заполненный ряд, этот ряд должен исчезнуть
(клас set уберем и остальные элементы сверху опустим на ряд вниз)  
 */
			for (let i = 1; i < 15; i++) {
				let count = 0;
				for (let k = 1; k < 11; k++) { //пробежит по координатам х
					if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')){
						count++;
						if (count == 10) {
							score += 10; //за каждый заполненный ряд 10 очков
							input.value = `Ваши очки: ${score}`;
							
							for (let m=1; m<11; m++) {
								document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
							}
							//получим все эл-ты класом set и запишем их в перемнную set
							let set = document.querySelectorAll('.set');
							let newSet = [];
							for (let s=0; s<set.length; s++) {
								let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
								if (setCoordinates[1] > i) {
									set[s].classList.remove('set');
									newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`));
								}
							}  
							for (let a=0; a<newSet.length; a++) {
								newSet[a].classList.add('set');
							}
							i--;
						}
					}
				} 
			}
/*Правило окончания игры
Как только фигура застрянеть на 15ом ряду(который не виден нам) игра должна закончится*/
			for (let n=1; n<11; n++) {
				if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
					clearInterval(interval);
					alert(`Игра окончена. Ваши очки: ${score}`);
					break;
				}
			}
			create(); //создается новая фигура, которая будет падать вниз
		}
}

//интервал будет повторят функцию move по скорости, те плавно будет падать вниз
let interval = setInterval(() => {
	move();
}, speed);

let flag = true;

//действия при нажатии клавиш вправо и влево
window.addEventListener('keydown', function (e){
	//новые переменные и координаты каждой ячейки
	let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
	let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
	let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
	let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

	//определяем новое положение фигуры в пространстве 
	function getNewState(a) {
		
		flag = true;

		//при перемещении кнопками позиция Y остается без изменении, а позиция X менятеся вправо +1, влево -1 
		let figureNew = [
			document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
			document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
			document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
			document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
		];

		for (let i = 0; i < figureNew.length; i++) {
			if (!figureNew[i] || figureNew[i].classList.contains('set')) { /* !figureNew не существует или содержит класс set */
				flag = false;
			}
		}

		if (flag == true) {
			//от figureBody отнимаем клас figure, перезаписываем figureBody на figureNew
			for (let i = 0; i < figureBody.length; i++) { 
				figureBody[i].classList.remove('figure');
			}

			figureBody = figureNew;

			for (let i = 0; i < figureBody.length; i++) { 
				figureBody[i].classList.add('figure');
			}
		}
	}

	//что пройзойдет если нажмем на стрелку
	if (e.keyCode == 37) { //37 стрелка влево. Н:двизаемся влево позиция Х был 5, должен стать 4.
		getNewState(-1);
	} else if (e.keyCode == 39) { //39 стрелка вправо.Н:двизаемся влево позиция Х был 5, должен стать 6.
		getNewState(1);
	} else if (e.keyCode == 40) { //40 стрелка вниз(падает быстрее).
		move();
	} else if (e.keyCode == 38) { //38 стрелка вверх(меняет фигуры повороатми).
		flag = true;

		//записываем координаты нового состояния + те координаты которые прописали в mainArr в главном массиве (т.е 4й элемент палочного массива на 90гр )
		let figureNew = [
			document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
			document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
			document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
			document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
		];

		for (let i = 0; i < figureNew.length; i++) {
			if (!figureNew[i] || figureNew[i].classList.contains('set')) { /* !figureNew не существует или содержит класс set */
				flag = false;
			}
		}

		if (flag == true) {
			//от figureBody отнимаем клас figure, перезапишем figureBody на figureNew
			for (let i = 0; i < figureBody.length; i++) { 
				figureBody[i].classList.remove('figure');
			}

			figureBody = figureNew;

			for (let i = 0; i < figureBody.length; i++) { //возвращем класс figure новому figureBody
				figureBody[i].classList.add('figure');
			}

			if (rotate < 4) { 
				rotate++;
			} else { //если клавишу вверх нажимали много раз и rotate=4, то его значение сбрасывается до 1
				rotate = 1;
			}

		}
	}
})

}