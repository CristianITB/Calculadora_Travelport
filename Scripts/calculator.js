function takeValue(x) {
	document.getElementById('calculatorDisplay').value += x;
}

function clearInput(x) {
	document.getElementById('calculatorDisplay').value = x;
}

function calculateWithEval(){
	let displayContent = document.getElementById('calculatorDisplay').value

	let x = eval(displayContent);
	document.getElementById('calculatorDisplay').value = x;
}

function calculateResult() {

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


