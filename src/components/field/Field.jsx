import cn from 'classnames';
import styles from './Field.module.scss';
import { generateCellId } from '../../utils/generateCellId';

export function Field({ size = 10 }) {
  const sizeMap = {
    10: styles.grid_10,
    3: styles.grid_3,
  };
  const fieldClass = cn(styles.field, sizeMap[size]);
  const fieldCells = Array.from({ length: size ** 2 }).map((_, index) => (
    <div
      data-cell-id={generateCellId(index, size)}
      key={generateCellId(index, size)}
      className={styles.cell}
    ></div>
  ));

  return <div className={fieldClass}>{fieldCells}</div>;
}
