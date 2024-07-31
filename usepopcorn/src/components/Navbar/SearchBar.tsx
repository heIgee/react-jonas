import { useRef } from 'react';
import { useKey } from '../../hooks/useKey';

export default function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey('Enter', () => inputEl.current?.focus());

  return (
    <input
      ref={inputEl}
      autoFocus
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(ev) => setQuery(ev.target.value)}
    />
  );
}
