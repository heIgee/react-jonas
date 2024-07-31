import { useEffect } from 'react';

export const useKey = (key: string, action: () => void) => {
  useEffect(() => {
    const actionOnKey = (ev: KeyboardEvent) => {
      if (ev.code.toLowerCase() === key.toLowerCase()) action();
    };
    document.addEventListener('keydown', actionOnKey);
    return () => {
      document.removeEventListener('keydown', actionOnKey);
    };
  }, [key, action]);
};
