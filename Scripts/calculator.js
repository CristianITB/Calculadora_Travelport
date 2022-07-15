document.addEventListener('keydown', (event) => {
	var keyValue = event.key;
	//var codeValue = event.code;

	if(keyValue == "Escape"){
		clearDisplay("0");		
	} else if(keyValue == "Enter"){
		calculateResult();
	} else if(keyValue == "Control"){
		changeSign();
	} else if(keyValue == ","){
		addComa();
	} else if(keyValue == "+"){
		removeAllHighlights();
		document.getElementById("+").classList.add("highlightOperator")		//como solucionar lo del event para poder reutilizar
	} else if(keyValue == "-"){												//la funcion de highlight sin tener qe meter id a los operators
		removeAllHighlights();												//y hacer getElementbyId.classlist.add("highlightOperator")
		document.getElementById("-").classList.add("highlightOperator")
	} else if(keyValue == "*"){
		removeAllHighlights();
		document.getElementById("*").classList.add("highlightOperator")
	} else if(keyValue == "/"){
		removeAllHighlights();
		document.getElementById("/").classList.add("highlightOperator")
	} else if(keyValue >= 0 && keyValue <= 9){
		takeValue(keyValue);
	}
   
	//console.log("keyValue: " + keyValue);
	//console.log("codeValue: " + codeValue);
  }, false);

function takeValue(x){  //check that can't add a coma when already have 10 char
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML == "0" || display.innerHTML == "NaN"){
		display.innerHTML = "";
		display.innerHTML += x;
	} else if(display.innerHTML.length <= 9 || (display.innerHTML.length == 10 && display.innerHTML.includes(",")) ||
			 (display.innerHTML.length == 10 && display.innerHTML.includes("-"))){
		if(x == ","){
			addComa();
		} else{
			display.innerHTML += x;
		}
	}
	checkLength();
}

function addComa(){
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML == 0){
		display.innerHTML = "0,"
	} else if(display.innerHTML.includes(",") == false && display.innerHTML.length < 10){
		display.innerHTML += ","
		document.getElementById("decimal").classList.add("disabledComa");
	}
}

function changeSign(){
	let display = document.getElementById('calculatorDisplay');

	if(display.innerHTML.includes(",")){
		let replacedDisplay = display.innerHTML.replace(",", ".");
		replacedDisplay *= -1;
		let replacedDisplayBis = replacedDisplay.toString().replace(".", ",");
		display.innerHTML = replacedDisplayBis;
	} else{
		display.innerHTML *= -1;
	}
}

function clearDisplay(x){
	removeAllHighlights();
	document.getElementById('calculatorDisplay').innerHTML = x;
}

function checkLength(){
	let display = document.getElementById('calculatorDisplay');
	if(
		(display.innerHTML.length == 10 && display.innerHTML.includes(",") == false && display.innerHTML.includes("-") == false) ||
	    (display.innerHTML.length == 11 && display.innerHTML.includes(",") == false && display.innerHTML.includes("-") == true) ||
	    (display.innerHTML.length == 11 && display.innerHTML.includes(",") == true && display.innerHTML.includes("-") == false) ||
		(display.innerHTML.length == 12 && display.innerHTML.includes(",") == true && display.innerHTML.includes("-") == true)
	){
		document.getElementById("decimal").classList.add("disabledComa");
		let numbers = document.getElementsByClassName("numbers");

		for(let i = 0; i < numbers.length; i++)
		numbers[i].classList.add("disabledNumbers");
	}
}


function highlightOperator(x){
	removeAllHighlights();
	let changeClass = x.currentTarget.classList;
	changeClass.add("highlightOperator");
}

function removeOperatorsHighlight(){
	let changeClass = document.getElementsByClassName('operators');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('highlightOperator');
	}
} 

function removeComaHighlight(){
	let coma = document.getElementById("decimal");
	coma.classList.remove("disabledComa")
}

function removeNumbersHighlight(){
	let changeClass = document.getElementsByClassName('numbers');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('disabledNumbers');
	}
}

function removeAllHighlights(){
	removeOperatorsHighlight();
	removeComaHighlight();
	removeNumbersHighlight();
}


/* ---- Function about the backspace, but it was erased ftm ---- */
function deleteCharacter(){
	let display = document.getElementById('calculatorDisplay');
	display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length-1);
	if(display.innerHTML == ""){
		display.innerHTML = "0";
	}
}


/* ----- Calculation functions ------ */

var firstNumber = 0
var secondNumber = 0

function calculateWithEval(){
	let displayContent = document.getElementById('calculatorDisplay').innerHTML

	let x = eval(displayContent);
	document.getElementById('calculatorDisplay').innerHTML = x;
}

function calculateResult(){
	removeOperatorsHighlight();
	removeComaHighlight();

	let displayContent = document.getElementById('calculatorDisplay').innerHTML

	for(i = 0; i < displayContent.length; i++) {
		if(displayContent[i] == '+'){
			calculateSum(displayContent);
		} else if(displayContent[i] == '-'){
			calculateSubtraction(displayContent);
		} else if(displayContent[i] == '*'){
			calculateMultiplication(displayContent);
		} else if(displayContent[i] == '/'){
			calculateDivision(displayContent);
		}
	}
}

function calculateSum(displayContent){
	let sumArray = displayContent.split('+');
	let sum = parseInt(sumArray[0]) + parseInt(sumArray[1]);
	document.getElementById('calculatorDisplay').value = sum;
}

function calculateSubtraction(displayContent){
	let subtractionArray = displayContent.split('-');
	let subtraction = parseInt(subtractionArray[0]) - parseInt(subtractionArray[1]);	
	document.getElementById('calculatorDisplay').value = subtraction;
}

function calculateMultiplication(displayContent){
	let multiplicationArray = displayContent.split('*');
	let multiplication = parseInt(multiplicationArray[0]) * parseInt(multiplicationArray[1]);
	document.getElementById('calculatorDisplay').value = multiplication;
}

function calculateDivision(displayContent){
	let divisionArray = displayContent.split('/');
	let division = parseInt(divisionArray[0]) / parseInt(divisionArray[1]);
	document.getElementById('calculatorDisplay').value = division;
}


