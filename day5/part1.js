// Read input from file input.txt
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// Split input by line
const lines = input.split('\n').filter((line) => line !== '');

const seeds = lines[0].replace('seeds: ', '').split(' ').map((num) => parseInt(num));

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

console.log(seeds);
seeds.forEach((seed, i) => {
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

	console.log(seed);
});
