import fs from 'fs';
import readline from 'readline';

export async function fileReader(
  filePath: string,
  lineHandler: (line: string) => string,
): Promise<string[]> {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  const lines: string[] = [];

  return new Promise((resoleve) => {
    readInterface
      .on('line', (line) => lines.push(lineHandler(line)))
      .on('close', () => resoleve(lines));
  });
}
