// Read input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input into array of lines
const lines = input.split('\n').filter(line => line !== '');

const moveInstructions = lines[0].split('');

const moveMap = {};
lines.forEach((line, i) => {
	if (i === 0) return;

	const splitLine = line.replace('= (','').replace(')','').replace(',','').split(' ');

	const [ input, left, right ] = splitLine;

	moveMap[input] = [left, right];
});

let currentField = 'AAA';
let moves = 0;

while (currentField !== 'ZZZ') {
	const moveInstructionId = moves % moveInstructions.length;
	const nextMove = moveInstructions[moveInstructionId];
	moves ++;
	currentField = moveMap[currentField][nextMove === 'L' ? 0 : 1];
}

console.log(moves);
