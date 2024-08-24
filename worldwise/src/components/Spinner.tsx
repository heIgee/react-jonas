import { useEffect, useState } from 'react';
import styles from './Spinner.module.css';

export default function Spinner({ delay = 1000 }: { delay?: number }) {
  const [isDelaying, setIsDelaying] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsDelaying(false);
    }, delay);
    return () => clearTimeout(timerId);
  }, [delay]);

  if (isDelaying) return;

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
