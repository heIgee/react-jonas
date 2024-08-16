import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  type,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: 'primary' | 'back' | 'position';
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}
