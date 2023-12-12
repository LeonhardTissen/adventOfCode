// Read input.txt
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

// Split input by line
const lines = input.split('\n').filter((line) => line !== '');

function getNumbers(str) {
	return str.split(' ').map((num) => parseInt(num)).filter((num) => !isNaN(num));
}

const cardQuantities = Array(lines.length).fill(1);

lines.forEach((line, i) => {
	const currentCardQuantity = cardQuantities[i];

	const [_, gameInformation] = line.split(': ');

	const [ winningNumbersStr, yourNumbersStr ] = gameInformation.split(' | ');

	const winningNumbers = getNumbers(winningNumbersStr);
	const yourNumbers = getNumbers(yourNumbersStr);
	const winningNumbersThatMatchYours = [];

	winningNumbers.forEach((winningNumber) => {
		if (yourNumbers.includes(winningNumber)) {
			winningNumbersThatMatchYours.push(winningNumber);
		}
	});

	console.log(winningNumbers, yourNumbers, winningNumbersThatMatchYours);

	const winningNumbersAmt = winningNumbersThatMatchYours.length;
	for (let j = 0; j < winningNumbersAmt; j ++) {
		cardQuantities[i + j + 1] += currentCardQuantity;
	}

	console.log(cardQuantities.join(', '));
})

const totalCards = cardQuantities.reduce((a, b) => a + b);

console.log(totalCards);
