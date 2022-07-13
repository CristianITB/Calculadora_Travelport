document.addEventListener('keydown', (event) => {
	var keyValue = event.key;
	var codeValue = event.code;

	if(keyValue == "Escape"){
		document.getElementById('calculatorDisplay').value = "0";
	} else if(keyValue == "Enter"){
		calculateResult();
	} else if(keyValue == "Control"){
		changeSign();
	} else if(keyValue == "+"){
		highlightOperator(event); //como solucionar lo del event para poder reutilizar
								  //la funcion de highlight sin tener qe meter id a los operators
								  //y hacer getElementbyId.classlist.add("highlightOperator")
	}
   
	//console.log("keyValue: " + keyValue);
	//console.log("codeValue: " + codeValue);
  }, false);

function takeValue(x){
	let display = document.getElementById('calculatorDisplay')
	if(display.value == "0" || display.value == "NaN"){
		display.value = "";
		display.value += x
	} else{
		display.value += x
	}
}

function changeSign(){
	let display = document.getElementById('calculatorDisplay');
	if(display.value == 0){
		display.value = "-"
	} else{
		display.value *= -1;
	}
}

function addComa(){
	let display = document.getElementById('calculatorDisplay');
	if(display.value == 0){
		display.value = "0."
	} else{
		display.value += "."
	}
}

function clearInput(x){
	removeHighlight();
	document.getElementById('calculatorDisplay').value = x;
}

function deleteCharacter(){
	let display = document.getElementById('calculatorDisplay');
	display.value = display.value.slice(0, display.value.length-1);
	if(display.value == ""){
		display.value = "0";
	}
}

function highlightOperator(x){
	removeHighlight();
	let changeClass = x.currentTarget.classList;
	changeClass.add("highlightOperator");
}

function removeHighlight(){
	let changeClass = document.getElementsByClassName('operators');
	for(let i = 0; i < changeClass.length; i++){
		changeClass[i].classList.remove('highlightOperator');
	}
} 



/* ----- Calculation functions ------ */

function calculateWithEval(){
	let displayContent = document.getElementById('calculatorDisplay').value

	let x = eval(displayContent);
	document.getElementById('calculatorDisplay').value = x;
}

function calculateResult(){
	removeHighlight();

	let displayContent = document.getElementById('calculatorDisplay').value

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


