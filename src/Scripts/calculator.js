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
	} else if(([",", ".", "+", "-", "*", "/"].includes(keyValue) || (keyValue >= 0 && keyValue <= 9)) && currentDisplay != "ERROR"){
		takeValue(keyValue);
	}
  }, false);

var multipleOperation = false;
var previousKey = "";

function takeValue(userInput){
	let display = document.getElementById('calculatorDisplay');
	if(([",", "."].includes(userInput) || (userInput >= 0 && userInput <= 9)) && (display.innerHTML != "ERROR")){
		if(userInput != "," && operatorSign == "" && (display.innerHTML == "0" || display.innerHTML == "NaN" || ((firstNumber == 0 && operatorSign == "" && secondNumber == 0)))){
			if(userInput != 0){
				removeComaHighlight();
				removeChangeSignHighlight();
				removeZeroHighlight();
				firstNumber = userInput;
				display.innerHTML = "";
				display.innerHTML += userInput;
			}
		} else if((Math.abs(replaceComma(display.innerHTML))).toString().length <= 10 || (Math.abs(replaceComma(display.innerHTML))).toString().length <= 11 && display.innerHTML.includes(",")){
			if(userInput == "," || userInput == "."){
				addComa();
			} else{
				removeChangeSignHighlight();
				removeZeroHighlight();
				display.innerHTML += userInput;
			}
		}
		if(operatorSign != "" || multipleOperation == true){
			getSecondValue(userInput);
		}
		checkLength();
	} else{
		operatorsManagement(userInput);
	}
	previousKey = userInput;
}

function operatorsManagement(userOperatorValue){
	removeOperatorsHighlight();
	document.getElementById(userOperatorValue).classList.add("highlightOperator");
	if(operatorSign == ""){
		getFirstvalue(userOperatorValue);
	} else if(secondNumber != 0 || (((secondNumber == 0 && ["/", "*"].includes(operatorSign) && operatorSign != previousKey)))){	
		if(gotSecondValue == true){
			calculateResult(userOperatorValue);
			multipleOperation = true;
			operatorSign = userOperatorValue;
		} else{
			displayError();
		}
	} else{
		operatorSign = userOperatorValue;
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
		let displayValue = display.innerHTML.slice(0, display.innerHTML.length-1)*-1;
		displayValue += ",";
		display.innerHTML = displayValue;
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

function clearDisplay(clearValue){
	removeAllHighlights();
	cleanTemporaryVars();
	highlightZero();
	highlightChangeSign();
	document.getElementById('calculatorDisplay').innerHTML = clearValue;
}

function checkLength(){
	let display = document.getElementById('calculatorDisplay');
	if((Math.abs(display.innerHTML).toString().length == 10 && display.innerHTML.includes(",") == false) || (Math.abs(replaceComma(display.innerHTML)).toString().length == 11 && display.innerHTML.includes(",") == true)){
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
	replaceCommasIfNeeded();
	let sum = (parseFloat(firstNumber) + parseFloat(secondNumber));

	checkResultLength(sum);
	return sum;
}

function calculateSubtraction(){
	replaceCommasIfNeeded();
	let substraction = (parseFloat(firstNumber) - parseFloat(secondNumber))

	checkResultLength(substraction);
	return substraction;
}

function calculateMultiplication(){
	replaceCommasIfNeeded();
	let mult = parseFloat(firstNumber) * parseFloat(secondNumber);

	checkResultLength(mult);
	return mult;
}

function calculateDivision(){
	replaceCommasIfNeeded();
	let div = parseFloat(firstNumber) / parseFloat(secondNumber);

	checkResultLength(div);
	return div;
}

function interpretateError(errorCheck, operationResult){
	if(errorCheck == true){
		displayError();
	} else{
		if(errorCheck != false){
			operationResult = errorCheck;
		}
		document.getElementById('calculatorDisplay').innerHTML = operationResult;
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

function replaceCommasIfNeeded(){
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
	} else if (Math.abs(result).toString().length >= 11 && !result.toString().includes(".")){
		error = true;
	} else if(Math.abs(result).toString().length > 11 && result.toString().includes(".")){
		result = cutDecimals(result);
	} 

	if(secondNumber == 0 && operatorSign == "/"){
		error = true;
	}

	if(result.toString().includes(".")){
		result = replaceDot(result.toString());
	}

	interpretateError(error, result)
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