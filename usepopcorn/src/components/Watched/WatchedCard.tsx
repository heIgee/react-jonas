import WatchedMovie from '../../models/WatchedMovie';

export default function WatchedCard({ movie }: { movie: WatchedMovie }) {
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
      </div>
    </li>
  );
}
