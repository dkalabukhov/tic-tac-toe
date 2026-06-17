export function checkWinCondition(matrix, lastMove, winningCount, turn) {
  const { row, col } = lastMove;

  const directions = [
    { dr: 1, dc: 0 }, // bottom ↓
    { dr: -1, dc: 0 }, // top ↑
    { dr: 0, dc: 1 }, // right →
    { dr: 0, dc: -1 }, // left ←
    { dr: 1, dc: 1 }, // left-top to right-bottom ↘
    { dr: -1, dc: -1 }, // right-bottom to left-top ↖
    { dr: 1, dc: -1 }, // right-top to left-bottom ↙
    { dr: -1, dc: 1 }, // right-bottom to left-top ↗
  ];

  for (let i = 0; i < directions.length; i += 2) {
    let count = 1;
    const winningCoordinates = [{ row, col, order: 0 }];

    for (let j = 1; j < winningCount; j += 1) {
      const { dr, dc } = directions[i];
      const newRow = row + dr * j;
      const newCol = col + dc * j;

      if (
        newRow < 0 ||
        newRow > matrix.length - 1 ||
        newCol < 0 ||
        newCol > matrix.length - 1 ||
        matrix[newRow][newCol] !== turn
      ) {
        break;
      }

      if (matrix[newRow][newCol] === turn) {
        count += 1;
        winningCoordinates.push({ row: newRow, col: newCol, order: -j });
      }

      if (count === winningCount) {
        return {
          winner: turn,
          winningCoordinates: winningCoordinates.sort(
            (a, b) => a.order - b.order,
          ),
        };
      }
    }

    for (let k = 1; k < winningCount; k += 1) {
      const { dr, dc } = directions[i + 1];
      const newRow = row + dr * k;
      const newCol = col + dc * k;

      if (
        newRow < 0 ||
        newRow > matrix.length - 1 ||
        newCol < 0 ||
        newCol > matrix.length - 1 ||
        matrix[newRow][newCol] !== turn
      ) {
        break;
      }

      if (matrix[newRow][newCol] === turn) {
        count += 1;
        winningCoordinates.push({ row: newRow, col: newCol, order: k });
      }

      if (count === winningCount) {
        return {
          winner: turn,
          winningCoordinates: winningCoordinates.sort(
            (a, b) => a.order - b.order,
          ),
        };
      }
    }
  }

  return { winner: null, winningCoordinates: null };
}
