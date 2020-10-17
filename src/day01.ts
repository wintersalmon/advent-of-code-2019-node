import _ from 'lodash';
import { fileReader } from './utils/fileReader';

function calculateRequiredFuel(weight: number): number {
  const fuel = Math.floor(weight / 3) - 2;

  if (fuel > 0) {
    return fuel + calculateRequiredFuel(fuel);
  }

  return 0;
}

export default function main(): void {
  const fileName = './src/resources/inputs/day01.txt';

  const lineHandler = (line: string) => {
    return parseInt(line, 10);
  };

  fileReader<number>(fileName, lineHandler).then((lines) => {
    const totalWeight = _.reduce(
      lines,
      (acc, weight) => {
        return acc + calculateRequiredFuel(weight);
      },
      0,
    );

    // eslint-disable-next-line no-console
    console.debug(totalWeight);
  });
}

main();
