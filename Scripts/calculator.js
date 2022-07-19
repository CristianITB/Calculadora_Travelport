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
		getFirstvalue(keyValue);
	} else if(keyValue == "-"){
		getFirstvalue(keyValue);
	} else if(keyValue == "*"){
		getFirstvalue(keyValue);
	} else if(keyValue == "/"){
		getFirstvalue(keyValue);
	} else if(keyValue >= 0 && keyValue <= 9){
		takeValue(keyValue);
		/*
		if(operatorSign != ""){
			getSecondValue(keyValue);
		} 
		*/
	}
   
	//console.log("keyValue: " + keyValue);
	//console.log("codeValue: " + codeValue);
  }, false);

function takeValue(x){
	let display = document.getElementById('calculatorDisplay');
	if(x >= 0 && x <= 9){
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
		if(operatorSign != ""){
			getSecondValue(x);
		}
		checkLength();
	} else{
		getFirstvalue(x)
	}

}

function getFirstvalue(keyValue){
	removeAllHighlights();
	firstNumber = document.getElementById("calculatorDisplay").innerHTML;
	operatorSign = keyValue;
	document.getElementById(keyValue).classList.add("highlightOperator");
}

function getSecondValue(keyValue){
	let display = document.getElementById('calculatorDisplay');
	if(secondNumber == 0){
		removeNumbersHighlight();
		removeComaHighlight();
		display.innerHTML = "";
		display.innerHTML = keyValue;
		secondNumber = display.innerHTML;
	}
}

function addComa(){
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML == 0){
		display.innerHTML = "0,"
	} else if(display.innerHTML.includes(",") == false && display.innerHTML.length < 10){
		display.innerHTML += ",";
		highlightComma();
	}
}

function changeSign(){
	let display = document.getElementById('calculatorDisplay');

	if(display.innerHTML.includes(",")){
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
		highlightComma();
		highlightNumbers();
	}
}


function highlightOperator(x){
	removeAllHighlights();
	let changeClass = x.currentTarget.classList;
	changeClass.add("highlightOperator");
}

function highlightComma(){
	document.getElementById("decimal").classList.add("disabledComa");
}

function highlightNumbers(){
	let numbers = document.getElementsByClassName("numbers");

	for(let i = 0; i < numbers.length; i++){
		numbers[i].classList.add("disabledNumbers");
	}
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
var operatorSign = ""
var secondNumber = 0

function calculateResult(){
	removeOperatorsHighlight();
	removeComaHighlight();

	secondNumber = document.getElementById('calculatorDisplay').innerHTML;

	if(operatorSign == '+'){
		calculateSum();
	} else if(operatorSign == '-'){
		calculateSubtraction();
	} else if(operatorSign == '*'){
		calculateMultiplication();
	} else if(operatorSign == '/'){
		calculateDivision();
	}
}

function calculateSum(){
	checkCommas();
	let sum = parseFloat(firstNumber) + parseFloat(secondNumber);

	if(sum.toString().includes(".")){
		sum = replaceDot(sum.toString());
	}

	let error = checkResultLength(sum);

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = sum;
		cleanTemporaryVars();
		firstNumber = sum;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
}

function calculateSubtraction(){
	checkCommas();
	let substraction = parseFloat(firstNumber) - parseFloat(secondNumber);

	if(substraction.toString().includes(".")){
		substraction = replaceDot(substraction.toString());
	}

	let error = checkResultLength(substraction);

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = substraction;
		cleanTemporaryVars();
		firstNumber = substraction;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
}

function calculateMultiplication(){
	checkCommas();
	let mult = parseFloat(firstNumber) * parseFloat(secondNumber);

	if(mult.toString().includes(".")){
		mult = replaceDot(mult.toString());
	}

	let error = checkResultLength(mult);

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = mult;
		cleanTemporaryVars();
		firstNumber = mult;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
}

function calculateDivision(){
	checkCommas();
	let div = parseFloat(firstNumber) / parseFloat(secondNumber);

	if(div.toString().includes(".")){
		div = replaceDot(div.toString());
	}

	let error = checkResultLength(div);

	if(secondNumber == 0){
		error = true;
	}

	if(error == false){
		document.getElementById('calculatorDisplay').innerHTML = div;
		cleanTemporaryVars();
		firstNumber = div;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR (result too long)";
		highlightComma();
		highlightNumbers();
	}
}

function cleanTemporaryVars(){
	firstNumber = 0;
	secondNumber = 0;
	operatorSign = "";
}

function checkCommas(){
	if(firstNumber.includes(",")){
		firstNumber = replaceComma(firstNumber);
	}
	if(secondNumber.includes(",")){
		secondNumber = replaceComma(secondNumber);
	}
}

function checkResultLength(result){
	let error = false;
	if(result.length >= 10){
		if(	(result.length == 10 && result.includes(",") == false && result.includes("-") == false) ||
			(result.length == 11 && result.includes(",") == false && result.includes("-") == true) ||
			(result.length == 11 && result.includes(",") == true && result.includes("-") == false) ||
			(result.length == 12 && result.includes(",") == true && result.includes("-") == true)
		){
			error = false;
		} else{
			error = true;
		}
	}
	return error;
}