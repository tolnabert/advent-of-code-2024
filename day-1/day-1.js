import { readFile } from 'fs/promises';

const inputFilePath = './day-1/input.txt';

async function main() {
  const inputData = await readFileContent();
  const numberPairs = parseInputData(inputData);

  const totalDistance = calculateTotalDistance(numberPairs);
  const similarityScore = calculateSimilarityScore(numberPairs);

  console.log('Total distance:', totalDistance);
  console.log('Total similarity score:', similarityScore);
}

async function readFileContent() {
  try {
    const data = await readFile(inputFilePath, 'utf8');
     data;
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}

function parseInputData(inputData) {
  return inputData
    .trim()
    .split('\n')
    .map((line) => {
      const [left, right] = line.trim().split(/\s+/).map(Number);
      return { left, right };
    });
}

function calculateTotalDistance(numberPairs) {
  const leftList = numberPairs.map((pair) => pair.left);
  const rightList = numberPairs.map((pair) => pair.right);

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  return totalDistance;
}

function calculateSimilarityScore(numberPairs) {
  const leftList = numberPairs.map((pair) => pair.left);
  const rightList = numberPairs.map((pair) => pair.right);

  let similarityScore = 0;

  for (const leftNumber of leftList) {
    const countInRightList = rightList.filter(
      (rightNumber) => rightNumber === leftNumber
    ).length;

    similarityScore += leftNumber * countInRightList;
  }

  return similarityScore;
}

main();
