import WatchedMovie from '../../models/WatchedMovie';

const averageNum = (arr: number[]) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function WatchedSummary(
  // prettier-ignore
  { watched }: { watched: WatchedMovie[] },
) {
  const avgImdbRating = averageNum(watched.map((movie) => movie.imdbRating));
  const avgUserRating = averageNum(watched.map((movie) => movie.userRating));
  const avgRuntime = averageNum(watched.map((movie) => movie.runtime));
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
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
