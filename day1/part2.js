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

const wordNumbers = {
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
	'seven': 7,
	'eight': 8,
	'nine': 9,
}
/**
 * @param {string} str
 * @returns {string}
 */
function replaceWordNumbers(str) {
	let consoleLogThat = str.includes('oneight');
	const before = str;
	for (const [word, number] of Object.entries(wordNumbers)) {
		/*
		Because the input has stuff like 'oneight', we leave part of the word at the start and end lmao
		https://www.reddit.com/r/adventofcode/comments/1884fpl/2023_day_1for_those_who_stuck_on_part_2/
		*/
		str = str.replaceAll(word, `${word.charAt(0)}${number}${word.charAt(word.length - 1)}`);
	}
	if (consoleLogThat) {
		console.log(before, str);
	}
	return str;
}

let solutionOutput = 0;
lines.forEach((line) => {
	// Account for empty lines
	if (line === '') return;

	const parsedLine = replaceWordNumbers(line);
	const foundDigits = getDigitsFromStr(parsedLine);
	const sumOfFirstAndLastDigit = addFirstAndLastDigits(foundDigits);

	// Add sum to total
	solutionOutput += sumOfFirstAndLastDigit;
});

console.log(solutionOutput);
