import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='cities'>Cities</NavLink>
        </li>
        <li>
          <NavLink to='countries'>Countries</NavLink>
        </li>
        <li>
          <NavLink to='form' className={styles.ctaLink}>
            Form
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
