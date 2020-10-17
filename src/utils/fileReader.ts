import fs from 'fs';
import readline from 'readline';

export async function fileReader<T = string>(
  filePath: string,
  lineHandler: (line: string) => T,
): Promise<T[]> {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  const lines: T[] = [];

  return new Promise((resoleve) => {
    readInterface
      .on('line', (line) => lines.push(lineHandler(line)))
      .on('close', () => resoleve(lines));
  });
}
