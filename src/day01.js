const _ = require('lodash');
const fileReader = require('./utils/fileReader');

function calculateRequiredFuel(weight) {
  const fuel = Math.floor(weight / 3) - 2;
  if (fuel > 0) {
    return fuel + calculateRequiredFuel(fuel);
  }
  return 0;
}

export default function main() {
  const fileName = './src/resources/inputs/day01.txt';
  const lineHandler = line => {
    return parseInt(line, 10);
  };

  fileReader(fileName, lineHandler).then(lines => {
    const totalWeight = _.reduce(
      lines,
      (acc, weight) => {
        return acc + calculateRequiredFuel(weight);
      },
      0,
    );
    console.log(totalWeight);
  });
}

main();
