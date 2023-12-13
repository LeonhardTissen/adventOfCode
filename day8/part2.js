// Read input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input into array of lines
const lines = input.split('\n').filter(line => line !== '');

const moveInstructions = lines[0].split('');

const moveMap = {};
const fields = [];

lines.forEach((line, i) => {
	if (i === 0) return;

	const splitLine = line.replace('= (','').replace(')','').replace(',','').split(' ');

	const [ input, left, right ] = splitLine;

	if (input.endsWith('A')) {
		fields.push(input)
	}
	moveMap[input] = [left, right];
});

let moves = 0;

let allOnFieldsEndingInZ = false;
while (!allOnFieldsEndingInZ) {
	const moveInstructionId = moves % moveInstructions.length;
	const nextMove = moveInstructions[moveInstructionId];
	fields.forEach((field, i) => {
		fields[i] = moveMap[field][nextMove === 'L' ? 0 : 1];
	})
	moves ++;
	if (moves % 10000000 === 0) console.log(moves);

	allOnFieldsEndingInZ = fields.every(field => field.endsWith('Z'));
}

console.log(moves);
