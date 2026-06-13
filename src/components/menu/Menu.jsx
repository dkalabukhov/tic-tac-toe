import cn from 'classnames';

import styles from './Menu.module.scss';

export function Menu({ handleSelectSize, handleReset }) {
  return (
    <div className={cn(styles.menu, 'container_sm')}>
      <div className={styles.sizeSelect}>
        <label htmlFor='size'>Choose size</label>
        <select onChange={(e) => handleSelectSize(e)} name='size' id='size'>
          <option value='10'>10x10</option>
          <option value='3'>3x3</option>
        </select>
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
