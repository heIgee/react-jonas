import Movie from '../../models/Movie';
import MovieCard from './MovieCard';

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className='list'>
      {movies.map((m) => (
        <MovieCard movie={m} />
      ))}
    </ul>
  );
}
