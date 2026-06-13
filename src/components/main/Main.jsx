import { Field } from '../field/Field.jsx';

import styles from './Main.module.scss';

export function Main() {
  return (
    <main className={styles.main}>
      <div className='container'>
        <Field />
      </div>
    </main>
  );
}
