// Load file input.txt
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

// Split input by line
const lines = input.split('\n');

const numbers = '1234567890';

let currentlyReadingNumber = '';
let isNextToSymbol = false;
let partNumberSum = 0;

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

function isSymbol(char) {
	return (
		char !== undefined && 
		char !== '.' && 
		!numbers.includes(char)
	)
}

lines.forEach((line, y) => {
	line.split('').forEach((char, x) => {
		if (numbers.includes(char)) {
			currentlyReadingNumber += char;
			neighbouringPositions.forEach(([xOffset, yOffset]) => {
				const xPos = x + xOffset;
				const yPos = y + yOffset;

				const neighbourChar = lines[yPos]?.[xPos];
				if (isSymbol(neighbourChar)) {
					isNextToSymbol = true;
				}
			});
		} else if (currentlyReadingNumber !== '') {
			if (isNextToSymbol) {
				partNumberSum += parseInt(currentlyReadingNumber);
				isNextToSymbol = false;
			}
			currentlyReadingNumber = '';
		}
	});
});

console.log(partNumberSum);
