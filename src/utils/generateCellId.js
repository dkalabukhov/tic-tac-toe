export function generateCellId(index, size) {
  return `${Math.floor(index / size)}${index % size}`;
}
