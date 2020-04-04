const fileReader = require('./utils/fileReader');

const DEBUG = false;

function debug(instructions, command, srcA, srcB, dst) {
  if (!DEBUG) {
    return;
  }
  const op = command === 1 ? '+' : '*';
  console.log(`${op} (${srcA} ${srcB}) ${dst}`);
  // console.log(`  (${instructions[srcA]} ${instructions[srcB]}) ${instructions[dst]}`);
  console.log();
}

function runIntcodeSimulator(instructionsSrc, noun = 0, verb = 0) {
  const instructions = [...instructionsSrc];
  instructions[1] = noun;
  instructions[2] = verb;

  let currPosition = 0;
  while (currPosition >= 0) {
    if (instructions[currPosition] === 99) {
      break;
    }

    const [command, srcA, srcB, dst] = instructions.slice(
      currPosition,
      currPosition + 4,
    );

    if (command === 1) {
      instructions[dst] = instructions[srcA] + instructions[srcB];
      debug(instructions, command, srcA, srcB, dst);
    } else if (command === 2) {
      instructions[dst] = instructions[srcA] * instructions[srcB];
      debug(instructions, command, srcA, srcB, dst);
    } else {
      console.log('undefined\n');
    }
    currPosition += 4;
  }

  return instructions[0];
}

// 7960
function main() {
  const fileName = './src/resources/inputs/day02.txt';
  const lineHandler = line => {
    return line.split(',').map(n => parseInt(n, 10));
  };

  fileReader(fileName, lineHandler).then(lines => {
    const instructions = lines[0];
    let answer = null;
    for (let noun = 0; noun <= 99; noun += 1) {
      for (let verb = 0; verb <= 99; verb += 1) {
        const result = runIntcodeSimulator(instructions, noun, verb);
        console.log(`${verb}, ${verb}: ${result}`);
        if (result === 19690720) {
          answer = 100 * noun + verb;
        }
      }
    }

    console.log(answer);
  });
}

main();