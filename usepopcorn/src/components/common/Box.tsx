import { useState } from 'react';
import OpenButton from './OpenButton';

export default function Box({ children }: any) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <OpenButton isOpen={isOpen} onOpen={() => setIsOpen((o) => !o)} />
      {isOpen && children}
    </div>
  );
}
