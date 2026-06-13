export class Matrix {
  constructor(size, matrix, turn) {
    this.matrix = matrix
      ? matrix
      : Array.from({ length: size }).map(() =>
          Array.from({ length: size }).fill(null),
        );
    this.winningCount = size === 10 ? 5 : 3;
    this.turn = turn ? turn : 'X';
    this.size = size;
  }

  makeMove(outerCoord, innerCoord) {
    if (this.matrix[outerCoord][innerCoord]) {
      return new Matrix(this.size, this.matrix, this.turn);
    }
    this.matrix[outerCoord][innerCoord] = this.turn === 'X' ? 'X' : 'O';
    console.log(this.matrix);
    this.turn = this.turn === 'X' ? 'O' : 'X';
    return new Matrix(this.size, this.matrix, this.turn);
  }

  reset() {
    return new Matrix(this.size);
  }

  getCoordSymbol(outerCoord, innerCoord) {
    if (!this.matrix[outerCoord][innerCoord]) {
      return '';
    }
    return this.matrix[outerCoord][innerCoord];
  }

  checkWin() {}
}
