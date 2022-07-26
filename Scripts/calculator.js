document.addEventListener('keydown', (event) => {
	var keyValue = event.key;
	//var codeValue = event.code;
	event.preventDefault();

	if(keyValue == "Escape"){
		clearDisplay("0");		
	} else if(keyValue == "Enter"){
		calculateResult("=");
	} else if(keyValue == "Control"){
		changeSign();
	} else if(keyValue == ","){
		takeValue(keyValue);
	} else if(keyValue == "+"){
		takeValue(keyValue);
	} else if(keyValue == "-"){
		takeValue(keyValue);
	} else if(keyValue == "*"){
		takeValue(keyValue);
	} else if(keyValue == "/"){
		takeValue(keyValue);
	} else if(keyValue >= 0 && keyValue <= 9){
		takeValue(keyValue);
	}
   
	//console.log("keyValue: " + keyValue);
	//console.log("codeValue: " + codeValue);
  }, false);

var multipleOperation = false;


function takeValue(x){
	let display = document.getElementById('calculatorDisplay');
	if((x >= 0 && x <= 9 || x == ",") && (display.innerHTML != "ERROR")){
		if(x != "," && operatorSign == "" && (display.innerHTML == "0" || display.innerHTML == "NaN" || ((firstNumber == 0 && operatorSign == "" && secondNumber == 0)))){
			console.log("aqui maquina")
			removeComaHighlight();
			firstNumber = x;
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
		if(operatorSign != "" || multipleOperation == true){
			getSecondValue(x);
		}
		checkLength();
	} else{
		operatorsManagement(x);
	}
}

function operatorsManagement(operatorValue){
	removeOperatorsHighlight();
	document.getElementById(operatorValue).classList.add("highlightOperator");
	if(operatorSign == ""){
		getFirstvalue(operatorValue);
	} else if(secondNumber != 0 || (secondNumber == 0 && (operatorSign == "/" || operatorSign == "*"))){    //--> aquí está la clave de la solución 
		calculateResult(operatorValue);
		multipleOperation = true;
		operatorSign = operatorValue;
	} else{
		operatorSign = operatorValue;
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
		removeAllHighlights();
		if(keyValue == ","){
			display.innerHTML = "0,"
			highlightComma();
		} else{
			console.log("aqui maquina???????????")
			display.innerHTML = "";
			display.innerHTML = keyValue;
		}
		secondNumber = display.innerHTML;
	}
}

function addComa(){
	if(firstNumber == 0){
		firstNumber = "0,"
	}
	let display = document.getElementById('calculatorDisplay');
	if(display.innerHTML == 0){
		display.innerHTML = "0,"
		highlightComma();
	} else if(display.innerHTML.includes(",") == false && display.innerHTML.length < 10){
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

function highlightAllOperators(){
	//Actually, when we need to disable all the operators, we do also need to disable de "=" button;
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

/*
function highlightAllOperators(){
	let changeClass = document.getElementsByClassName('operators');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.add('disabledoperators');
	}
}
*/

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
	let coma = document.getElementById("decimal");
	coma.classList.remove("disabledComa")
	coma.disabled = false;
}

function removeNumbersHighlight(){
	let changeClass = document.getElementsByClassName('numbers');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('disabledNumbers');
		changeClass[i].disabled = false;
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

function calculateResult(keyValue){

	if(secondNumber == 0){ 			// --> si fas 10 = et pilla el 2n com a 0 i per això mostra 0
		removeOperatorsHighlight();
		document.getElementById('calculatorDisplay').innerHTML = 0;
		console.log("entra")
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

	firstNumber = operationResult;
	secondNumber = 0;

	if(keyValue != "="){
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

	let error = checkResultLength(sum);

	if(error != true){
		if(error != false){
			sum = error;
		}
		document.getElementById('calculatorDisplay').innerHTML = sum;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR";
		highlightAllOperators();
		highlightComma();
		highlightNumbers();
	} 

	return sum;
}

function calculateSubtraction(){
	checkCommas();
	let substraction = (parseFloat(firstNumber) - parseFloat(secondNumber))

	if(substraction.toString().includes(".")){
		substraction = replaceDot(substraction.toString());
	}

	let error = checkResultLength(substraction);

	if(error != true){
		if(error != false){
			substraction = error;
		}
		document.getElementById('calculatorDisplay').innerHTML = substraction;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR";
		highlightAllOperators();
		highlightComma();
		highlightNumbers();
	} 
	return substraction;
}

function calculateMultiplication(){
	checkCommas();
	let mult = parseFloat(firstNumber) * parseFloat(secondNumber);

	if(mult.toString().includes(".")){
		mult = replaceDot(mult.toString());
	}

	let error = checkResultLength(mult);

	if(error != true){
		if(error != false){
			mult = error;
		}
		document.getElementById('calculatorDisplay').innerHTML = mult;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR";
		highlightAllOperators();
		highlightComma();
		highlightNumbers();
	} 
	return mult;
}

function calculateDivision(){
	checkCommas();
	let div = parseFloat(firstNumber) / parseFloat(secondNumber);

	if(div.toString().includes(".")){
		div = replaceDot(div.toString());
	}

	//puedo hacer que dentro de check result length me checkee la long y de error o no, y ademas me lo corte si fuera necesario;

	let error = checkResultLength(div);

	if(secondNumber == 0){
		error = true;
	}

	if(error != true){
		if(error != false){
			div = error;
		}
		document.getElementById('calculatorDisplay').innerHTML = div;
	} else{
		document.getElementById('calculatorDisplay').innerHTML = "ERROR";
		highlightAllOperators();
		highlightComma();
		highlightNumbers();
	} 
	return div;
}

function cleanTemporaryVars(){
	firstNumber = 0;
	secondNumber = 0;
	operatorSign = "";
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
	
	//console.log(result)
	//console.log(typeof(result))     //ejemplo del 84 / 4,3
	if(result.toString().includes(",")){
		//console.log(parseFloat(replaceComma(result)) + " parsed");
		result = parseFloat(replaceComma(result));
	}
	//console.log(Math.abs(result))
	//console.log(Math.abs(result).toString().length)


	if(Math.abs(result).toString().length <= 10 || (Math.abs(result).toString().length == 11 && result.toString().includes("."))){
		console.log("Todo correcto makina")
		error = false;
	} else if(Math.abs(result).toString().length > 11 && result.toString().includes(".")){
		console.log("A este le tienes qe cortar decimales")
		return cutDecimals(result);
	} else if (Math.abs(result).toString().length >= 11 && result.toString().includes(".") == false){
		console.log("Este num es demasiado grande")
		error = true;
	} else{
		console.log("lol")
	}

	if(result.length >= 10){
		if(	(result.length == 10 && result.includes(",") == false && result.includes("-") == false) ||
			(result.length == 11 && result.includes(",") == false && result.includes("-") == true) ||
			(result.length == 11 && result.includes(",") == true && result.includes("-") == false) ||
			(result.length == 12 && result.includes(",") == true && result.includes("-") == true)				//esto se puede manejar mejoor si pones qe solo se fije en el abs, te ahorras casos del or
		){
			error = false;
		} else{
			error = true;
		}
	} 
	return error;
}

function cutDecimals(numberToCut){
	let i = 10;
	let newvalue = numberToCut;
	while(Math.abs(newvalue).toString().length > 11){
		newvalue = numberToCut.toFixed(i);
		i--;
	}

	let jesus = newvalue;
	for(let i = newvalue.length-1; i >= 0; i-- ){
		if(newvalue[i] == 0){
			jesus = jesus.slice(0, jesus.length-1)
		}
		if(newvalue[i] == "."){
			break;
		}
	}
	return replaceDot(jesus);
}