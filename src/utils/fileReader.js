const fs = require('fs');
const readline = require('readline');

module.exports = async function fileReader(filePath, lineHandler) {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    console: false,
  });

  const lines = [];
  return new Promise(resoleve => {
    readInterface
      .on('line', line => lines.push(lineHandler(line)))
      .on('close', () => resoleve(lines));
  });
};
