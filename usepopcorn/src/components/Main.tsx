import MovieListBox from './Movies/MovieListBox';
import WatchedListBox from './Watched/WatchedListBox';

export default function Main() {
  return (
    <main className='main'>
      <MovieListBox />
      <WatchedListBox />
    </main>
  );
}
