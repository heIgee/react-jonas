import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  variant,
  type = 'button',
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  variant: 'primary' | 'back' | 'position';
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
