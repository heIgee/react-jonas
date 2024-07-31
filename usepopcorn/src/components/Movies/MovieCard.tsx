import Movie from '../../models/Movie';

export default function MovieCard({
  movie,
  onSelectMovie,
}: {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
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
