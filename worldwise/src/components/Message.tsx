import { ReactNode } from 'react';
import styles from './Message.module.css';

export default function Message({ message }: { message: ReactNode }) {
  return (
    <p className={styles.message}>
      <span role='img'>👋</span> {message}
    </p>
  );
}
