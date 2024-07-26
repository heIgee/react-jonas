import WatchedMovie from '../../models/WatchedMovie';
import WatchedCard from './WatchedCard';

export default function WatchedList({ watched }: { watched: WatchedMovie[] }) {
  return (
    <ul className='list'>
      {watched.map((m) => (
        <WatchedCard movie={m} />
      ))}
    </ul>
  );
}
