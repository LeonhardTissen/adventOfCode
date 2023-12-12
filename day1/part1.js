// Load file input.txt
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

// Get all lines from input.txt
const lines = input.split('\n');

/**
 * @param {string} str
 * @returns {number[]}
 */
function getDigitsFromStr(str) {
	return str.split('').filter(char => !isNaN(char)).map(Number);
}

/**
 * @param {number[]} digits 
 * @returns {number}
 */
function addFirstAndLastDigits(digits) {
	return parseInt(`${digits[0]}${digits[digits.length - 1]}`);
}

let output = 0;
lines.forEach((line) => {
	// Account for empty lines
	if (line === '') return;

	const digits = getDigitsFromStr(line);
	const sum = addFirstAndLastDigits(digits);

	// Add sum to total
	output += sum;
});

console.log(output);
