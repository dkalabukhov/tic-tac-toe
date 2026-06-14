export function getSymbol(matrix, x, y) {
  const row = Number(y);
  const col = Number(x);

  if (!matrix?.[row]?.[col]) {
    return '';
  }
  return matrix[row][col];
}
