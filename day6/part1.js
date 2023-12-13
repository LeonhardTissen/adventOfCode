// Read file input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input by line
const lines = input.split('\n').filter((line) => line !== '');

// Retrieve numbers
const numbers = lines.map((line) => {
	return line.split(' ').map((num) => parseInt(num)).filter((num) => !isNaN(num));
});

let totalWinMultiplier = 0;

for (let round = 0; round < numbers[0].length; round ++) {
	const totalTime = numbers[0][round];
	const recordDistance = numbers[1][round];

	let amountOfPossibleWins = 0;
	for (let secondsHeld = 0; secondsHeld < totalTime; secondsHeld ++) {
		const timeDriving = totalTime - secondsHeld;
		const distanceTraveled = timeDriving * secondsHeld;
		
		if (distanceTraveled > recordDistance) {
			// console.log(round, secondsHeld);
			amountOfPossibleWins ++;
		}
	}

	if (totalWinMultiplier === 0) {
		totalWinMultiplier = amountOfPossibleWins;
	} else {
		totalWinMultiplier *= amountOfPossibleWins;
	}
}
console.log(totalWinMultiplier);
