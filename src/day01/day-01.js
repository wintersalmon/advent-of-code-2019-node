const fs = require('fs');
const readline = require('readline');

function calculateRequiredFuel(weight) {
  const fuel = Math.floor(weight / 3) - 2;
  if (fuel > 0) {
    return fuel + calculateRequiredFuel(fuel);
  }
  return 0;
}

function main() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./src/day01/day-01.txt'),
    output: process.stdout,
    console: false,
  });
  let totalRequiredFuel = 0;
  readInterface
    .on('line', line => {
      const moduleWeight = parseInt(line, 10);
      const requiredFuel = calculateRequiredFuel(moduleWeight);
      totalRequiredFuel += requiredFuel;
      console.log(moduleWeight, requiredFuel);
    })
    .on('close', () => {
      console.log(totalRequiredFuel);
    });
}

main();
