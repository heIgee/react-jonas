import WatchedMovie from '../../models/WatchedMovie';
import WatchedCard from './WatchedCard';

export default function WatchedList({
  watchedMovies,
  onRemoveWatched,
}: {
  watchedMovies: WatchedMovie[];
  onRemoveWatched: (id: string) => void;
}) {
  return (
    <ul className='list'>
      {watchedMovies.map((m) => (
        <WatchedCard movie={m} onRemoveWatched={onRemoveWatched} />
      ))}
    </ul>
  );
}
