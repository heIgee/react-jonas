import { useState } from 'react';
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';
import OpenButton from '../OpenButton';
import { tempWatchedData } from '../../tempData';

export default function WatchedListBox() {
  const [watched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <OpenButton isOpen={isOpen} onOpen={() => setIsOpen((o) => !o)} />
      {isOpen && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
}
