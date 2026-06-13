import cn from 'classnames';
import styles from './Field.module.scss';
import { generateCellId } from '../../utils/generateCellId';
import { Matrix } from './Matrix.js';
import { useEffect, useState } from 'react';
import { Menu } from '../menu/Menu.jsx';

export function Field() {
  const [size, setSize] = useState(10);
  const [matrix, setMatrix] = useState(new Matrix(size));

  useEffect(() => {
    setMatrix(matrix.reset());
  }, [size]);

  const handleCellClick = (e) => {
    const [outerCoord, innerCoord] = e.target.dataset.cellId;
    setMatrix(matrix.makeMove(outerCoord, innerCoord));
  };

  const handleSelectSize = (e) => {
    setSize(Number(e.target.value));
  };

  const handleReset = () => {
    setMatrix(matrix.reset());
  };

  const sizeMap = {
    10: styles.grid_10,
    3: styles.grid_3,
  };

  const fieldClass = cn(styles.field, sizeMap[size]);
  const fieldCells = Array.from({ length: size ** 2 }).map((_, index) => {
    const cellId = generateCellId(index, size);
    const [outerCoord, innerCoord] = cellId;
    return (
      <div
        data-cell-id={cellId}
        key={cellId}
        className={styles.cell}
        onClick={(e) => handleCellClick(e)}
      >
        {matrix.getCoordSymbol(outerCoord, innerCoord)}
      </div>
    );
  });

  return (
    <>
      <div className='container_sm'>
        <Menu handleReset={handleReset} handleSelectSize={handleSelectSize} />
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
