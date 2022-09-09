document.addEventListener('keydown', (event) => {
	var keyValue = event.key;
	event.preventDefault();

	let currentDisplay = document.getElementById("calculatorDisplay").innerHTML;

	if(keyValue == "Escape"){
		clearDisplay("0");		
	} else if(keyValue == "Enter"){
		ableToCalculate();
	} else if(keyValue == "Control"){
		if (currentDisplay != "ERROR"){
			if(!["+", "-", "*", "/"].includes(previousKey))
			changeSign();
		}
	} else if((keyValue == "," || keyValue == "." || keyValue == "+" || keyValue == "-" || keyValue == "*" 
				|| keyValue == "/" || (keyValue >= 0 && keyValue <= 9)) && currentDisplay != "ERROR"){
		takeValue(keyValue);
	}
  }, false);

var multipleOperation = false;
var previousKey = "";

function takeValue(x){
	let display = document.getElementById('calculatorDisplay');
	if((x >= 0 && x <= 9 || x == "," || x == ".") && (display.innerHTML != "ERROR")){
		if(x != "," && operatorSign == "" && (display.innerHTML == "0" || display.innerHTML == "NaN" || ((firstNumber == 0 && operatorSign == "" && secondNumber == 0)))){
			if(x != 0){
				removeComaHighlight();
				removeChangeSignHighlight();
				removeZeroHighlight();
				firstNumber = x;
				display.innerHTML = "";
				display.innerHTML += x;
			}
		} else if(display.innerHTML.length <= 9 || (display.innerHTML.length == 10 && display.innerHTML.includes(",")) ||
				 (display.innerHTML.length == 10 && display.innerHTML.includes("-")) || 
				 (display.innerHTML.length == 11 && display.innerHTML.includes("-") && display.innerHTML.includes(","))){
			if(x == "," || x == "."){
				addComa();
			} else{
				removeChangeSignHighlight();
				removeZeroHighlight();
				display.innerHTML += x;
			}
		}
		if(operatorSign != "" || multipleOperation == true){
			getSecondValue(x);
		}
		checkLength();
	} else{
		operatorsManagement(x);
	}
	previousKey = x;
}

function operatorsManagement(operatorValue){
	removeOperatorsHighlight();
	document.getElementById(operatorValue).classList.add("highlightOperator");
	if(operatorSign == ""){
		getFirstvalue(operatorValue);
	} else if(secondNumber != 0 || (((secondNumber == 0 && (operatorSign == "/" || operatorSign == "*") && operatorSign != previousKey)))){    //--> aquí está la clave de la solución 		
		if(gotSecondValue == true){
			calculateResult(operatorValue);
			multipleOperation = true;
			operatorSign = operatorValue;
		} else{
			displayError();
		}
	} else{
		operatorSign = operatorValue;
	}
	highlightChangeSign();
}

function getFirstvalue(keyValue){
	removeAllHighlights();
	firstNumber = document.getElementById("calculatorDisplay").innerHTML;
	operatorSign = keyValue;
	document.getElementById(keyValue).classList.add("highlightOperator");
}

var gotSecondValue = false;
function getSecondValue(keyValue){
	gotSecondValue = true;
	let display = document.getElementById('calculatorDisplay');
	if(secondNumber == 0){
		removeAllHighlights();
		if(keyValue == ","){
			display.innerHTML = "0,"
			highlightComma();
		} else{
			display.innerHTML = "";
			display.innerHTML = keyValue;
		}
		secondNumber = display.innerHTML;
	}
}

function ableToCalculate(){
	if(gotSecondValue == true || (gotSecondValue == false && operatorSign == false)){
		calculateResult("=");
	} else{
		displayError();
	}
}

function addComa(){
	removeChangeSignHighlight();
	if(firstNumber == 0){
		firstNumber = "0,"
		highlightChangeSign();
	}
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML == 0){
		display.innerHTML = "0,"
		highlightComma();
	} else if(display.innerHTML.includes(",") == false && Math.abs(display.innerHTML).toString().length < 10){
		display.innerHTML += ",";
		highlightComma();
	}
}

function changeSign(){
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML[display.innerHTML.length-1] == ","){
		let value = display.innerHTML.slice(0, display.innerHTML.length-1)*-1
		value += ",";
		display.innerHTML = value;
	} else if(display.innerHTML.includes(",")){
		let replacedDisplay = replaceComma(display.innerHTML);
		replacedDisplay *= -1;
		let replacedDisplayBis = replaceDot(replacedDisplay.toString());
		display.innerHTML = replacedDisplayBis;
	} else{
		display.innerHTML *= -1;
	}
}

function replaceComma(valueToChange){
	let replacedValue = valueToChange.replace(",", ".");
	return replacedValue;
}

function replaceDot(valueToChange){
	let replacedValue = valueToChange.replace(".", ",");
	return replacedValue;
}

function clearDisplay(x){
	removeAllHighlights();
	cleanTemporaryVars();
	highlightZero();
	highlightChangeSign();
	document.getElementById('calculatorDisplay').innerHTML = x;
}

function checkLength(){
	let display = document.getElementById('calculatorDisplay');
	replaceComma(display.innerHTML)
	if(
		(Math.abs(display.innerHTML).toString().length == 10 && display.innerHTML.includes(",") == false) ||
	    (Math.abs(replaceComma(display.innerHTML)).toString().length == 11 && display.innerHTML.includes(",") == true)
	){
		highlightComma();
		highlightNumbers();
	}
}

/* ----- Highlight functions ----- */

function highlightOperator(x){
	removeAllHighlights();
	let changeClass = x.currentTarget.classList;
	changeClass.add("highlightOperator");
}

function highlightAllOperators(){
	let changeClass = document.getElementsByClassName('operators');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.add('disabledOperators');
		changeClass[i].disabled = true;
	}
	document.getElementById("equalButton").classList.add("disabledEqual");
	document.getElementById("equalButton").disabled = true;
}

function highlightComma(){
	document.getElementById("decimal").classList.add("disabledComa");
	document.getElementById("decimal").disabled = true;
}

function highlightNumbers(){
	let numbers = document.getElementsByClassName("numbers");
	for(let i = 0; i < numbers.length; i++){
		numbers[i].classList.add("disabledNumbers");
		numbers[i].disabled = true;
	}
}

function highlightChangeSign(){
	document.getElementById("changeSign").classList.add("disabledChangeSign");
	document.getElementById("changeSign").disabled = true;
}

function removeOperatorsHighlight(){
	let changeClass = document.getElementsByClassName('operators');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('highlightOperator');
		changeClass[i].classList.remove('disabledOperators');
		changeClass[i].disabled = false;
	}
	document.getElementById("equalButton").classList.remove("disabledEqual");
	document.getElementById("equalButton").disabled = false;
} 

function removeComaHighlight(){
	document.getElementById("decimal").classList.remove("disabledComa");
	document.getElementById("decimal").disabled = false;
}

function removeNumbersHighlight(){
	let changeClass = document.getElementsByClassName('numbers');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('disabledNumbers');
		changeClass[i].disabled = false;
	}
}

function removeChangeSignHighlight(){
	document.getElementById("changeSign").classList.remove("disabledChangeSign");
	document.getElementById("changeSign").disabled = false;
}

function removeAllHighlights(){
	removeOperatorsHighlight();
	removeComaHighlight();
	removeNumbersHighlight();
	removeChangeSignHighlight();
}

function highlightZero(){
	document.getElementById("zero").classList.add("disabledZero");
	document.getElementById("zero").disabled = true;
}

function removeZeroHighlight(){
	document.getElementById("zero").classList.remove("disabledZero");
	document.getElementById("zero").disabled = false;
}

/* ----- Calculation functions ------ */

var firstNumber = 0;
var operatorSign = "";
var secondNumber = 0;

function calculateResult(keyValue){	

	if(secondNumber == 0 && operatorSign != ""){
		removeOperatorsHighlight();
		document.getElementById('calculatorDisplay').innerHTML = 0;
	}

	var operationResult = 0;
	secondNumber = document.getElementById('calculatorDisplay').innerHTML;
	
	if(operatorSign == '+'){
		operationResult = calculateSum();
	} else if(operatorSign == '-'){
		operationResult = calculateSubtraction();
	} else if(operatorSign == '*'){
		operationResult = calculateMultiplication();
	} else if(operatorSign == '/'){
		operationResult = calculateDivision();
	} else{
		if(secondNumber[secondNumber.length-1] == ","){
			document.getElementById('calculatorDisplay').innerHTML = secondNumber.slice(0, secondNumber.length-1)
		}
	}

	if(operationResult.toString().includes(",")){
		highlightComma();
	} else{
		if(Math.abs(operationResult).toString().length < 10 && document.getElementById('calculatorDisplay').innerHTML != "ERROR"){
			removeComaHighlight();
		} else{
			highlightComma();
		}
	}

	if(keyValue != "="){
		firstNumber = operationResult;
		secondNumber = 0;
		multipleOperation = true;
	} else{
		cleanTemporaryVars();
		multipleOperation = false;
	}
}

function calculateSum(){
	checkCommas();
	let sum = (parseFloat(firstNumber) + parseFloat(secondNumber))

	if(sum.toString().includes(".")){
		sum = replaceDot(sum.toString());
	}

	let errorCheck = checkResultLength(sum);  //errorCheck can be a Boolean or the number with the decimals cut; JavaScript advantatges.

	interpretateError(errorCheck, sum);
	return sum;
}

function calculateSubtraction(){
	checkCommas();
	let substraction = (parseFloat(firstNumber) - parseFloat(secondNumber))

	if(substraction.toString().includes(".")){
		substraction = replaceDot(substraction.toString());
	}

	let errorCheck = checkResultLength(substraction);

	interpretateError(errorCheck, substraction);
	return substraction;
}

function calculateMultiplication(){
	checkCommas();
	let mult = parseFloat(firstNumber) * parseFloat(secondNumber);

	if(mult.toString().includes(".")){
		mult = replaceDot(mult.toString());
	}

	let errorCheck = checkResultLength(mult);

	interpretateError(errorCheck, mult);
	return mult;
}

function calculateDivision(){
	checkCommas();
	let div = parseFloat(firstNumber) / parseFloat(secondNumber);

	if(div.toString().includes(".")){
		div = replaceDot(div.toString());
	}

	let errorCheck = checkResultLength(div);

	if(secondNumber == 0){
		errorCheck = true;
	}

	interpretateError(errorCheck, div);
	return div;
}

function interpretateError(errorCheck, operationResult){
	if(errorCheck != true){
		if(errorCheck != false){
			operationResult = errorCheck;
		}
		document.getElementById('calculatorDisplay').innerHTML = operationResult;
	} else{
		displayError();
	} 
}

function cleanTemporaryVars(){
	firstNumber = 0;
	secondNumber = 0;
	operatorSign = "";
	gotSecondValue = false;
}

function displayError(){
	document.getElementById('calculatorDisplay').innerHTML = "ERROR";
	highlightAllOperators();
	highlightComma();
	highlightNumbers();
}

function checkCommas(){
	if(firstNumber.toString().includes(",")){
		firstNumber = replaceComma(firstNumber);
	}
	if(secondNumber.toString().includes(",")){
		secondNumber = replaceComma(secondNumber);
	}
}

function checkResultLength(result){
	let error = false;
	
	if(result.toString().includes(",")){
		result = parseFloat(replaceComma(result));
	}

	if(Math.abs(result).toString().length <= 10 || (Math.abs(result).toString().length == 11 && result.toString().includes("."))){
		error = false;
	} else if(Math.abs(result).toString().length > 11 && result.toString().includes(".")){
		return cutDecimals(result);
	} else if (Math.abs(result).toString().length >= 11 && result.toString().includes(".") == false){
		error = true;
	}

	return error;
}

function cutDecimals(numberToCut){
	let i = 10;
	let newValue = numberToCut;
	while(Math.abs(newValue).toString().length > 11){
		newValue = numberToCut.toFixed(i);
		i--;
	}

	let fixedValue = newValue;
	for(let i = newValue.length-1; i >= 0; i-- ){
		if(newValue[i] == 0){
			fixedValue = fixedValue.slice(0, fixedValue.length-1)
		}
		if(newValue[i] == "."){
			break;
		}
	}
	return replaceDot(fixedValue);
}