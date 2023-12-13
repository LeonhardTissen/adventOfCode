// Read file input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input by line
const lines = input.split('\n').filter((line) => line !== '');

// Retrieve numbers
const numbers = lines.map((line) => {
	return parseInt(line.replaceAll(' ', '').split(':')[1]);
});
console.log(numbers);

const totalTime = numbers[0];
const recordDistance = numbers[1];

let amountOfPossibleWins = 0;
for (let secondsHeld = 0; secondsHeld < totalTime; secondsHeld ++) {
	const timeDriving = totalTime - secondsHeld;
	const distanceTraveled = timeDriving * secondsHeld;
	
	if (distanceTraveled > recordDistance) {
		amountOfPossibleWins ++;
	}
}

console.log(amountOfPossibleWins);
