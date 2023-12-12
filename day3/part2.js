// Load file input.txt
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

// Split input by line
const lines = input.split('\n');

const numbers = '1234567890';

let currentlyReadingNumber = '';

const neighbouringPositions = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1],
	[-1, -1],
	[-1, 1],
	[1, -1],
	[1, 1],
]

const numberRegistrar = {};
let foundNumberPositions = [];

// Search for all numbers and register their positions
lines.forEach((line, y) => {
	line.split('').forEach((char, x) => {
		if (numbers.includes(char)) {
			currentlyReadingNumber += char;
			foundNumberPositions.push([x, y]);
		} else if (currentlyReadingNumber !== '') {
			foundNumberPositions.forEach(([numberXPos, numberYPos]) => {
				numberRegistrar[[numberXPos, numberYPos]] = parseInt(currentlyReadingNumber);
			});
			foundNumberPositions = [];
			currentlyReadingNumber = '';
		}
	});

	if (currentlyReadingNumber !== '') {
		foundNumberPositions.forEach(([numberXPos, numberYPos]) => {
			numberRegistrar[[numberXPos, numberYPos]] = parseInt(currentlyReadingNumber);
		});
		foundNumberPositions = [];
		currentlyReadingNumber = '';
	}

	// console.log(currentlyReadingNumber);
});

function computeGearRatio(numbers) {
	const gearRatio = Array.from(numbers).reduce((a, b) => a * b);
	return gearRatio;
}

let gearRatioSum = 0;

// Go through the grid again and look for * symbol
lines.forEach((line, y) => {
	line.split('').forEach((char, x) => {
		if (char === '*') {
			const neighbouringNumbers = new Set();

			neighbouringPositions.forEach(([xOffset, yOffset]) => {
				const xPos = x + xOffset;
				const yPos = y + yOffset;
				
				const neighbouringNumber = numberRegistrar[[xPos, yPos]];

				if (neighbouringNumber !== undefined) {
					neighbouringNumbers.add(neighbouringNumber);
				}
			});

			// console.log(neighbouringNumbers);

			if (neighbouringNumbers.size === 2) {
				const gearRatio = computeGearRatio(neighbouringNumbers);
				// console.log(char, x, y, gearRatio);
				gearRatioSum += gearRatio;
			}
		}
	});
});

// console.log(numberRegistrar);
console.log(gearRatioSum);
