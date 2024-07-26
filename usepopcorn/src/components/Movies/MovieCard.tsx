import Movie from '../../models/Movie';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster.toString()} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
