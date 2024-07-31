import Movie from '../../models/Movie';
import MovieCard from './MovieCard';

export default function MovieList({
  movies,
  onSelectMovie,
}: {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
}) {
  return (
    <ul className='list list-movies'>
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
