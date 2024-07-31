import { useEffect, useState } from 'react';
import type MovieDetailsModel from '../models/MovieDetails';
import type WatchedMovie from '../models/WatchedMovie';
import Loader from './Loader';
import StarRating from '../StarRating';
import { useKey } from '../hooks/useKey';

const OMDB_KEY = '1295ffd6';

export default function MovieDetails({
  selectedId,
  onClose,
  onAddWatched,
  watchedMovies,
}: {
  selectedId: string;
  onClose: () => void;
  onAddWatched: (newMovie: WatchedMovie) => void;
  watchedMovies: WatchedMovie[];
}) {
  const [movie, setMovie] = useState<MovieDetailsModel | null>(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async function fetchMovieDetails() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${OMDB_KEY}`,
          { signal: controller.signal },
        );

        const data = await res.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        console.error(err as Error);
      }
    })();
    return () => {
      controller.abort();
      setMovie(null);
    };
  }, [selectedId]);

  useEffect(() => {
    if (!movie) return;
    document.title = movie.Title;
    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie]);

  useKey('Escape', onClose);

  const watchedMovie = watchedMovies.find((m) => m.imdbID === selectedId);
  const isAlreadyRated = !!watchedMovie;

  if (isAlreadyRated && !userRating) {
    setUserRating(watchedMovie.userRating);
  }

  const handleAddWatched = () => {
    if (!movie) return;

    // api format is like '169 min' or 'N/A'
    const parsedRuntime = Number(movie.Runtime.split(' ').at(0));
    const runtime = isNaN(parsedRuntime) ? 0 : parsedRuntime;

    const newMovie: WatchedMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: runtime,
      imdbRating: Number(movie.imdbRating),
      userRating: userRating,
    };
    onAddWatched(newMovie);
  };

  return (
    <div className='details'>
      <button className='btn-back' onClick={onClose}>
        ◁
      </button>
      {!movie ? (
        <Loader />
      ) : (
        <>
          <header>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div className='details-overview'>
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} • {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>⭐ {movie.imdbRating} IMDb</p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {isAlreadyRated ? (
                <p style={{ textAlign: 'center' }}>
                  You rated this movie 🌟 {userRating}
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={2.75}
                    onRatingSet={(r) => setUserRating(r)}
                  />
                  {userRating > 0 ? (
                    <button className='btn-add' onClick={handleAddWatched}>
                      + Add to List
                    </button>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
