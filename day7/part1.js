const cardHierarchy = 'AKQJT98765432'.split('').reverse();

// Read file input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input by line
const lines = input.split('\n').filter((line) => line !== '');

const gameResults = lines.map((line) => {
	const [ hand, bidStr ] = line.split(' ');
	const bid = parseInt(bidStr)

	const cardPool = [];
	hand.split('').forEach((card) => {
		let foundInPool = false;
		cardPool.forEach((cardPoolArr) => {
			if (cardPoolArr[0] === card) {
				cardPoolArr[1] ++;
				foundInPool = true;
			}
		});
		if (!foundInPool) {
			cardPool.push([ card, 1 ]);
		}
	});
	cardPool.sort((a, b) => {
		// Sort by second index
		if (a[1] < b[1]) {
			return 1;
		} else if (a[1] > b[1]) {
			return -1;
		}
	});

	let cardType = 'High card';
	let cardWorth = 0;
	const ultimateMultiplier = 10000000000;
	if (cardPool[0][1] === 5) {
		cardType = 'Five of a kind';
		cardWorth = 6 * ultimateMultiplier;
	} else if (cardPool[0][1] === 4) {
		cardType = 'Four of a kind';
		cardWorth = 5 * ultimateMultiplier;
	} else if (cardPool[0][1] === 3 && cardPool[1][1] === 2) {
		cardType = 'Full house';
		cardWorth = 4 * ultimateMultiplier;
	} else if (cardPool[0][1] === 3) {
		cardType = 'Three of a kind';
		cardWorth = 3 * ultimateMultiplier;
	} else if (cardPool[0][1] === 2 && cardPool[1][1] === 2) {
		cardType = 'Two pair';
		cardWorth = 2 * ultimateMultiplier;
	} else if (cardPool[0][1] === 2) {
		cardType = 'One pair';
		cardWorth = 1 * ultimateMultiplier;
	}

	let cardAdditionMultiplier = 100000000;
	for (let index = 0; index < 5; index++) {
		const card = hand[index];
		cardWorth += cardHierarchy.indexOf(card) * cardAdditionMultiplier;
		cardAdditionMultiplier /= 100;
	}

	return {cardWorth, bid, hand};
});

const sortedGameResults = gameResults.sort((a, b) => {
	if (a.cardWorth < b.cardWorth) {
		return 1;
	} else if (a.cardWorth > b.cardWorth) {
		return -1;
	}
	return 0;
});

let totalWinnings = 0;
sortedGameResults.forEach((gameResult, i) => {
	gameResult.rankMultiplier = sortedGameResults.length - i;
	totalWinnings += gameResult.bid * gameResult.rankMultiplier;
})

console.log(totalWinnings);
