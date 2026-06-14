import { checkWinCondition } from './checkWinCondition.js';
import { isDraw } from './isDraw.js';

export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SIZE':
      return {
        matrix: Array.from({ length: action.payload }).map(() =>
          Array.from({ length: action.payload }).fill(null),
        ),
        turn: 'X',
        size: action.payload,
        winningCount: action.payload === 10 ? 5 : 3,
        lastMove: null,
        winner: null,
      };
    case 'RESET':
      return {
        matrix: Array.from({ length: state.size }).map(() =>
          Array.from({ length: state.size }).fill(null),
        ),
        turn: 'X',
        size: state.size,
        winningCount: state.size === 10 ? 5 : 3,
        lastMove: null,
        winner: null,
      };
    case 'MAKE_MOVE': {
      const { row, col } = action.payload;
      if (state.matrix[row][col] || state.winner) {
        return state;
      }

      state.matrix[row][col] = state.turn === 'X' ? 'X' : 'O';
      state.lastMove = { row, col };

      state.winner = checkWinCondition(
        state.matrix,
        state.lastMove,
        state.winningCount,
        state.turn,
      );

      if (state.winner === null && isDraw(state.matrix)) {
        state.winner = 'Draw';
      }

      if (state.winner) {
        return {
          matrix: structuredClone(state.matrix),
          turn: state.turn,
          size: state.size,
          winningCount: state.winningCount,
          lastMove: state.lastMove,
          winner: state.winner,
        };
      }

      return {
        matrix: structuredClone(state.matrix),
        turn: state.turn === 'X' ? 'O' : 'X',
        size: state.size,
        winningCount: state.winningCount,
        lastMove: state.lastMove,
        winner: state.winner,
      };
    }

    default:
      return state;
  }
}
