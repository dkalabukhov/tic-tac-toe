export function isDraw(matrix) {
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix.length; j += 1) {
      if (matrix[i][j] === null) {
        return false;
      }
    }
  }

  return true;
}
