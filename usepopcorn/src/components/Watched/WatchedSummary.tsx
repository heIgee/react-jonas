import WatchedMovie from '../../models/WatchedMovie';

const averageNum = (arr: number[]) =>
  // this '+' removes redundant zeros
  +arr.reduce((acc, cur) => acc + cur / arr.length, 0).toFixed(2);

export default function WatchedSummary({
  watchedMovies,
}: {
  watchedMovies: WatchedMovie[];
}) {
  const avgImdbRating = averageNum(
    watchedMovies.map((movie) => movie.imdbRating),
  );
  const avgUserRating = averageNum(
    watchedMovies.map((movie) => movie.userRating),
  );
  const avgRuntime = averageNum(watchedMovies.map((movie) => movie.runtime));
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
