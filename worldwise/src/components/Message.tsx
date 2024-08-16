import { ReactNode } from 'react';
import styles from './Message.module.css';

function Message({ message }: { message: ReactNode }) {
  return (
    <p className={styles.message}>
      <span role='img'>👋</span> {message}
    </p>
  );
}

export default Message;
