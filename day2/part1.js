// Load file input.txt
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

// Split input by line
const lines = input.split('\n');

function parseGameInformation(line) {
	if (line === '') return;

	const [game, information] = line.split(': ');
	const gameId = parseInt(game.split(' ')[1]);

	const rounds = information.split('; ');
	return { gameId, rounds };
}

function getAmountAndColor(str) {
	const [amount, color] = str.split(' ');

	const amountInt = parseInt(amount);

	return { amountInt, color };
}

function getCubePool(game) {
	const cubeQuantities = game.split(', ');

	const cubePool = {};
	cubeQuantities.map(getAmountAndColor).forEach(({ amountInt, color }) => {
		if (cubePool[color] === undefined) {
			cubePool[color] = amountInt;
		} else {
			cubePool[color] += amountInt;
		}
	});
	return cubePool;
}

function isGamePossible(cubePool) {
	if (
		cubePool['red'] > 12 ||
		cubePool['green'] > 13 ||
		cubePool['blue'] > 14
	) {
		return false;
	}
	return true;
}

let gameIdSum = 0;
lines.map(parseGameInformation).forEach((game) => {
	if (game === undefined) return;

	let { gameId, rounds } = game;

	const isPossible = rounds.map(getCubePool).every(isGamePossible);

	if (isPossible) {
		gameIdSum += gameId;
	}
});
console.log(gameIdSum);
