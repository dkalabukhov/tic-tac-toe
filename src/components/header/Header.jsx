import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className='container'>
        <h1 className={styles.title}>Tic-tac-toe</h1>
      </div>
    </header>
  );
}
