// Read input from file input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input by line
const lines = input.split('\n').filter((line) => line !== '');

const seedRanges = lines[0].replace('seeds: ', '').split(' ').map((num) => parseInt(num));
const seeds = [];

// Only 100 million items... should be fine!
for (let i = 0; i < seedRanges.length; i += 2) {
	for (let seed = seedRanges[i]; seed < seedRanges[i + 1]; seed ++) {
		seeds.push(seed);
	}
}

const mappingStringGroups = new Array(7).fill(0).map(x => []);

// Extract mapping information for seeds
let currentMap = -1;
lines.forEach((line, i) => {
	if (i === 0) {
		return;
	} else if (line.includes('map')) {
		currentMap ++;
		return;
	}
	mappingStringGroups[currentMap].push(line);
})

let lowestSeed = Infinity;

seeds.forEach((seed) => {
	mappingStringGroups.forEach((mappingStrings) => {
		let wasConverted = false;

		mappingStrings.forEach((mappingString) => {
			if (wasConverted) return;

			const mappingStringArr = mappingString.split(' ');
			const mapping = mappingStringArr.map((num) => parseInt(num));
			const [ destRange, sourceRange, rangeLength ] = mapping;
			
			if (seed >= sourceRange && seed < sourceRange + rangeLength) {
				seed += destRange - sourceRange;
				wasConverted = true;
			}
		});
	});

	if (seed < lowestSeed) {
		lowestSeed = seed;
	}
});

console.log(lowestSeed);
