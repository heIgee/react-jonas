import { useState } from 'react';
import MovieList from './MovieList';
import { tempMovieData } from '../../tempData';
import OpenButton from '../OpenButton';

export default function ListBox() {
  const [movies] = useState(tempMovieData);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <OpenButton isOpen={isOpen} onOpen={() => setIsOpen((o) => !o)} />
      {isOpen && <MovieList movies={movies} />}
    </div>
  );
}
