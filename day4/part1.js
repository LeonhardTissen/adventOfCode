// Read input.txt
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

// Split input by line
const lines = input.split('\n');

function getNumbers(str) {
	return str.split(' ').map((num) => parseInt(num)).filter((num) => !isNaN(num));
}

let totalScratchCardWorth = 0;

lines.forEach((line) => {
	if (line === '') return;

	const [_, gameInformation] = line.split(': ');

	const [ winningNumbersStr, yourNumbersStr ] = gameInformation.split(' | ');

	let scratchCardWorth = 0;

	const winningNumbers = getNumbers(winningNumbersStr);
	const yourNumbers = getNumbers(yourNumbersStr);
	const winningNumbersThatMatchYours = [];

	winningNumbers.forEach((winningNumber) => {
		if (yourNumbers.includes(winningNumber)) {
			if (scratchCardWorth === 0) {
				scratchCardWorth = 1;
			} else {
				scratchCardWorth *= 2;
			}
			winningNumbersThatMatchYours.push(winningNumber);
		}
	});

	totalScratchCardWorth += scratchCardWorth;

	console.log(winningNumbers, yourNumbers, scratchCardWorth, winningNumbersThatMatchYours);
})

console.log(totalScratchCardWorth);
