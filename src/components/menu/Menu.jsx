import cn from 'classnames';

import styles from './Menu.module.scss';

export function Menu({ handleSelectSize, handleReset, turn, winner }) {
  return (
    <div className={cn(styles.menu, 'container_sm', 'flex-center')}>
      <div className={styles.sizeSelect}>
        <label htmlFor='size'>Choose size</label>
        <select onChange={(e) => handleSelectSize(e)} name='size' id='size'>
          <option value='10'>10x10</option>
          <option value='3'>3x3</option>
        </select>
      </div>
      {winner ? (
        <h3 className={styles.info}>
          {winner === 'Draw' ? 'Draw' : `${winner} won!`}
        </h3>
      ) : (
        <h3 className={styles.info}>Turn: {turn}</h3>
      )}
      <button onClick={handleReset}>{winner ? 'Play Again' : 'Reset'}</button>
    </div>
  );
}
