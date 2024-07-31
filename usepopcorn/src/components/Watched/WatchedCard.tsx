import WatchedMovie from '../../models/WatchedMovie';

export default function WatchedCard({
  movie,
  onRemoveWatched,
}: {
  movie: WatchedMovie;
  onRemoveWatched: (id: string) => void;
}) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster.toString()} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className='btn-delete'
          onClick={() => onRemoveWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
