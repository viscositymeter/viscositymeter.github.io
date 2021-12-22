//===============
//Код секундоміра
const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;

var currentSeconds;
var currentMilliseconds;

//Початок відрахування
const startWatch = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	
	timer = setInterval(()=>{
		milliseconds += 10; //+=10
		let dateTimer = new Date(milliseconds);
		currentSeconds = '0'+dateTimer.getUTCSeconds();
		currentMilliseconds = '0'+dateTimer.getUTCMilliseconds();
	
		watch.innerHTML =
			(currentSeconds).slice(-2) + ':' +
			(currentMilliseconds).slice(-3, -1);//slice(-3,-1);//счьот 0.1с // -3, -1 -- счьот 0,01 секунд
	},10);
};

//Пауза секундоміра
const pauseWatch = (e) => {
  watch.classList.add('paused');
  clearInterval(timer);
	console.log(e);
	let output = [];
  let sNumber = e.toString();

for (var i = 0, len = sNumber.length; i < len; i += 1) {
    output.push(+sNumber.charAt(i));
}
console.log(output);
  watch.innerHTML =
			'0'+output[0]+':'+output[1]+'0';
};

//Обнулення секундоміра
const resetWatch = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	milliseconds = 0;
	watch.innerHTML = '00:00';
};
//Код секундоміра
//===============




//Тип обраної рідини
let liquidValue;
//Температура експерименту
let tempValue;


//Лічильник. Скільки раз було підтягнуто один тип рідини і проведено замірювань
let experimentTimes = 0;

let alcohol24Number = 1;
let alcohol32Number = 1;
let water24Number = 1;


//Функція рандомних чисел з діапазону для секундоміра
function randomInteger(min, max) {
  return Math.random() * (max - min) + min;
}

//Рандомне значення з діапазону. Витікання рідини за секунди
function liquidExpTime(){
	if (liquidValue === 'rad1') {
		//console.log("randomInteger:" + );
			return parseInt(randomInteger(61, 70))*100;
	}
	else if (liquidValue === 'rad2'){
			return parseInt(randomInteger(91, 100))*100;
	}
	else if (liquidValue === 'rad3'){
			return parseInt(randomInteger(71, 80))*100;
	}

	}
	

//Вішає атрибут disabled на елемент
function setDisabled(elem){
	document.getElementById(elem).setAttribute('disabled', 'disabled');
}

//Знімає атрибут disabled з елемента
function setEnabled(elem){
	document.getElementById(elem).removeAttribute('disabled');
}


//Обробник подій для кнопок
document.addEventListener('click', (e) =>{
	const element = e.target;
	if (element.id === 'form-submit'){ 
		playButtonSound('button-click.mp3');
		confirmParameters();
	}

	//Подати рідину
	if (element.id === 'fill') {
		fillWater();
		playButtonSound('water-into-glass.mp3');
		setEnabled('pippete');
		setDisabled('fill');
	}

	//Підтягнути рідину
	if (element.id === 'pippete') {
		playButtonSound('pippete.mp3');
		pippeteWater();
		setDisabled('pippete');
		setEnabled('start-exp');
		//setEnabled('drain');
		resetWatch();
	}

	//Розпочати замірювання
	if (element.id === 'start-exp') {
		var timeOfExperiment = liquidExpTime();
		console.log("timeOfExperiment: " + timeOfExperiment);
		startExperiment();
		startWatch();
		var roundedTime = timeOfExperiment/100*100;//Math.round(timeOfExperiment/100)*100;
		console.log("roundedTime: "+roundedTime);
		setTimeout(function(){pauseWatch(roundedTime)}, roundedTime); //roundedTime
		var time = parseInt(roundedTime) / 12;
		setTimeout(startExperiment1, time*1);
		setTimeout(startExperiment2, time*2);
		setTimeout(startExperiment3, time*3);
		setTimeout(startExperiment4, time*4);
		setTimeout(startExperiment5, time*5);
		setTimeout(startExperiment6, time*6);
		setTimeout(startExperiment7, time*7);
		setTimeout(startExperiment8, time*8);
		setTimeout(startExperiment9, time*9);
		setTimeout(startExperiment10, time*10);
		setTimeout(startExperiment11, time*11);
		setTimeout(startExperiment11, time*12);

		setDisabled('start-exp');
		
		
		console.log('Int is: '+ timeOfExperiment); //randomInteger(4500, 5000)
		setTimeout(stopSecond1, roundedTime);
		setTimeout(stopSecond2, roundedTime+roundedTime/12);
		setTimeout(stopSecond3, roundedTime+roundedTime/12);
		setTimeout(fillWater, roundedTime + 1200);
		experimentTimes += 1;
		console.log(experimentTimes);
		setTimeout (unlockAfterExperiment, roundedTime ); //roundedTime + 1500
		function addDataToTable(tableClass, number){
				var table = document.querySelector(tableClass);
				var th = document.createElement('tr');
				var firstTd = document.createElement('td');
				var secondTd = document.createElement('td');
				firstTd.textContent = parseInt(number);
				secondTd.textContent = ((parseInt((roundedTime/1000) * 10)) / 10); //roundedTime/1000
				th.appendChild(firstTd);
				th.appendChild(secondTd);
				table = table.querySelector('tbody');
				
				function addData(){
					table.appendChild(th);
				}
				setTimeout(addData, roundedTime);
		}
		function checkRadioForDataEntry(){
			if (liquidValue === 'rad1') {
				addDataToTable('.water24', water24Number);
				water24Number += 1;
			}
			if (liquidValue === 'rad2') {
				addDataToTable('.alcohol24', alcohol24Number);
				alcohol24Number += 1;
			}
			if (liquidValue === 'rad3') {
				addDataToTable('.alcohol32', alcohol32Number);
				alcohol32Number += 1;
			}
		}
		checkRadioForDataEntry();
		function unlockAfterExperiment(){
			if (experimentTimes < 5) {
				setEnabled('pippete');
			}
			else {
				setEnabled('drain');
			}
		}
		
	}

	//Злити рідину
	if (element.id === 'drain') {
		playButtonSound('drop-water.mp3');
		drainWater();
		var inputs = document.getElementsByTagName('input');
		for(var i = 0; i < inputs.length; i++){
			inputs[i].removeAttribute("disabled");
		}
		setEnabled('form-submit');
		setDisabled('drain');
		experimentTimes = 0;
		resetWatch();
	}
});

function playButtonSound(sound){
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'audio/'+ sound; // Указываем путь к звуку "клика"
	audio.autoplay = true;
}

function confirmParameters() {
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].setAttribute("disabled", "disabled");
	}
	document.getElementById('form-submit').setAttribute('disabled', 'disabled');
	document.getElementById('fill').removeAttribute('disabled');

	//Перевірка типу вказаної рідини
	var typeOfLiquid = document.getElementsByName('liquid');
	for(var i = 0; i <= typeOfLiquid.length; i++){
		if (typeOfLiquid[i].checked) {
			liquidValue = typeOfLiquid[i].value;
			break;
		}
	}
//Перевірка вказаної температури
	var temperatureValue = document.getElementsByName('liquid');
	for (var j = 0; j <= temperatureValue.length; j++) {
		if (temperatureValue[j].checked) {
			//підстановка картинки тари з температурою
			tempValue = temperatureValue[j].value;
			console.log(tempValue);
			if (temperatureValue[j].value == 'rad1' || temperatureValue[j].value == 'rad2') {
				document.getElementById('tara').setAttribute("src","img/sam/viscosimeter/tara24.png");
			}
			else if (temperatureValue[j].value == 'rad3') {
				document.getElementById('tara').setAttribute("src","img/sam/viscosimeter/tara32.png");
			}
			break;
		}
	}
	
}


//=====================================
//Функції заміни зображень віскозиметра

function fillWater() {
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main1.png");
}

function pippeteWater(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main2.png");
}

function drainWater(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main.png");
}

function startExperiment(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main3.png");
}

function stopSecond1(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main4.png");
}
function stopSecond2(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main41.png");
}
function stopSecond3(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main1.png");
}


//КОСТИЛІІІІІІІІІІІІІІІІІІІ
function startExperiment12(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main312.png");
}

function startExperiment11(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main311.png");
}
function startExperiment10(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main310.png");
}
function startExperiment9(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main39.png");
}
function startExperiment8(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main38.png");
}
function startExperiment7(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main37.png");
}
function startExperiment6(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main36.png");
}
function startExperiment5(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main35.png");
}
function startExperiment4(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main34.png");
}
function startExperiment3(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main33.png");
}
function startExperiment2(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main32.png");
}
function startExperiment1(){
	document.getElementById('visco').setAttribute("src","img/sam/viscosimeter/new/main31.png");
}

//КОСТИЛІІІІІІІІІІІІІІІІІІІ


//Функції заміни зображень віскозиметра
//=====================================

var arrLang = {
  'en': {
    'header': 'STUDY OF LIQUID VISCOSITY',
    'info': 'Info',
    'selectHeader': "Select liquid and temperature",
    'select1': "Distilled water at t = 24℃",
    'select2': "Distilled water + alcohol at t = 24℃",
    'select3': "Distilled water + alcohol at t = 32℃",
    'confirm': "Confirm",
    'button1': "Fill in Viscosimeter",
    'button2': "Tighten the fluid",
    'button3': "Start Experiment",
    'button4': "Pour out the liquid",
    'tableWater': 'Distilled water',
    'alcohol': '+ alcohol',
    'kg': 'kg',
    's': 's',
    'm': 'm',
    'n': 'N',
    'infoHeader': "Ostwald’s viscositymeter",
    'infoParagraph1': "A viscometer (also called viscosimeter) is an instrument used to measure the viscosity of a fluid. For liquids with viscosities which vary with flow conditions, an instrument called a rheometer is used. Thus, a rheometer can be considered as a special type of viscometer. Viscometers only measure under one flow condition",
    'infoParagraph2': "In general, either the fluid remains stationary and an object moves through it, or the object is stationary and the fluid moves past it. The drag caused by relative motion of the fluid and a surface is a measure of the viscosity.",

  },
  'ua': {
    'header': "ВИВЧЕННЯ В'ЯЗКОСТІ РІДИНИ",
    'info': 'Довідка',
    'selectHeader': "Оберіть рідину та температуру",
    'select1': "Дистильована вода при t = 24℃",
    'select2': "Дистильована вода + спирт при t = 24℃",
    'select3': "Дистильована вода + спирт при t = 32℃",
    'confirm': "Підтвердити",
    'button1': "Залити рідину",
    'button2': "Підтягнути рідину",
    'button3': "Почати експеримент",
    'button4': "Злити воду",
    'tableWater': 'Дистильована вода',
    'alcohol': '+ спирт',
    'kg': 'кг',
    's': 'с',
    'm': 'м',
    'n': 'Н',
    'infoHeader': 'Віскозиметр Оствальда',
    'infoParagraph1': "Віскозиметр Оствальда - це хімічний прилад, який використовується для вимірювання в’язкості рідини з відомою густиною.",
    'infoParagraph2': "Для вимірювання, рідина заповнюється до віскозиметра.Потім вона підтягується у резервуар грушею. Потім рідині дозволяється падати під дією сили тяжіння, поки вона не досягне нижнього резервуару. Вимірюється час, який витрачається рідиною на проходження двох міток маленької колби.",
  }
}

var arrTable = {
	'en': {
		'tableWater': 'Distilled water <br/><br/>',
	},
	'ua': {
		'tableWater': 'Дистильована вода <br/><br/>',
	}
}

$('.header__language__switch-btn').click(function(){
	$(this).removeClass('switch-uk');
  $(this).toggleClass('switch-ua');
  if ($(this).hasClass('switch-ua')) {
    $(this).trigger('on.switch');
    let lang = "ua";
    $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
  } else {
    $(this).trigger('off.switch');
    $(this).toggleClass('switch-uk');;
    let lang = "en";
    $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
  }
});


// Cпойлер

const headers = document.querySelectorAll("[data-name='spoiler-title']");
headers.forEach(function(item) {
   item.addEventListener("click", headerClick);
});
function headerClick() {
    this.nextElementSibling.classList.toggle("spoiler-body");
}