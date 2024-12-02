import { readFile } from 'fs/promises';

const filePath = './day-2/input.txt';

async function main() {
  const inputData = await readFileContent();
  const levelsArr = parseInputData(inputData);
  const safeReport = validateLevels(levelsArr);
  console.log(safeReport);
}

main();

async function readFileContent() {
  try {
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(error);
  }
}

function parseInputData(inputData) {
  return inputData
    .trim()
    .split('\n')
    .map((level) =>
      level
        .trim()
        .split(' ')
        .map((value) => {
          const parsed = parseInt(value);
          if (isNaN(parsed)) {
            throw new Error('Value of the level is not numeric');
          } else {
            return parsed;
          }
        })
    );
}

function validateLevels(levels) {
  let safeReport = 0;
  for (const level of levels) {
    if (new Set(level).size !== level.length || level.length < 2) {
      continue;
    }

    const isAscending = level[0] < level[1];
    let isValid = true;

    for (let i = 0; i < level.length - 1; i++) {
      const diff = level[i + 1] - level[i];

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        isValid = false;
        break;
      }

      if ((isAscending && diff < 0) || (!isAscending && diff > 0)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      safeReport++;
    }
  }

  return safeReport;
}
