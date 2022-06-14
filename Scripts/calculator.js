function takeValue(x) {
	document.getElementById('calculatorDisplay').value += x;
}

function clearInput(x) {
	document.getElementById('calculatorDisplay').value = x;
}

function calculateResult() {
	let x = eval(document.getElementById('calculatorDisplay').value);
	document.getElementById('calculatorDisplay').value = x;
}