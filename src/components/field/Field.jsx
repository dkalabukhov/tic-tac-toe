import cn from 'classnames';
import styles from './Field.module.scss';
import { generateCellId } from './generateCellId.js';
import { reducer } from './reducer.js';
import { useEffect, useReducer, useState } from 'react';
import { Menu } from '../menu/Menu.jsx';
import { getSymbol } from './getSymbol.js';

const INITIAL_STATE = {
  matrix: Array.from({ length: 10 }).map(() =>
    Array.from({ length: 10 }).fill(null),
  ),
  turn: 'X',
  size: 10,
  lastMove: null,
  winner: null,
};

export function Field() {
  const [size, setSize] = useState(10);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: 'CHANGE_SIZE', payload: size });
  }, [size]);

  const handleCellClick = (e) => {
    if (state.winner) return;
    const [y, x] = e.target.dataset.cellId;
    const row = Number(y);
    const col = Number(x);
    dispatch({ type: 'MAKE_MOVE', payload: { row, col } });
  };

  const handleSelectSize = (e) => {
    setSize(Number(e.target.value));
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const sizeMap = {
    10: styles.grid_10,
    3: styles.grid_3,
  };

  const fieldClass = cn(styles.field, sizeMap[size]);
  const fieldCells = Array.from({ length: size ** 2 }).map((_, index) => {
    const cellId = generateCellId(index, size);
    const [y, x] = cellId;
    const symbol = state ? getSymbol(state.matrix, x, y) : '';
    return (
      <div
        data-cell-id={cellId}
        key={cellId}
        className={styles.cell}
        onClick={(e) => handleCellClick(e)}
      >
        {symbol}
      </div>
    );
  });

  return (
    <>
      <div className='container_sm'>
        <Menu
          turn={state.turn === 'X' ? 'X' : 'O'}
          winner={state.winner}
          handleReset={handleReset}
          handleSelectSize={handleSelectSize}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={fieldClass}>
          {fieldCells}
          <div className={styles.line}></div>
        </div>
      </div>
    </>
  );
}
