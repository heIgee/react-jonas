import { useCallback, useState } from 'react';

import Navbar from './Navbar';
import Logo from './Navbar/Logo';
import SearchBar from './Navbar/SearchBar';
import NumResults from './Navbar/NumResults';

import Main from './Main';
import Box from './common/Box';
import MovieList from './Movies/MovieList';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedList from './Watched/WatchedList';
import type WatchedMovie from '../models/WatchedMovie';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import MovieDetails from './MovieDetails';
import { useMovies } from '../hooks/useMovies';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

// import { tempMovieData, tempWatchedData } from '../tempData';

export default function App() {
  const [watchedMovies, setWatchedMovies] = useLocalStorageState<
    WatchedMovie[]
  >([], 'movies');

  const [query, setQuery] = useLocalStorageState('Hobbit', 'query');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const handleSelectMovie = (id: string) => {
    setSelectedId((prev) => (id === prev ? null : id));
  };

  const handleAddWatched = (movie: WatchedMovie) => {
    setWatchedMovies((prev) => [...prev, movie]);
    handleCloseMovie();
  };

  const handleRemoveWatched = (id: string) => {
    setWatchedMovies((prev) => prev.filter((m) => m.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={(q) => setQuery(q)} />
        <NumResults num={movies.length} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              onClose={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedList
                watchedMovies={watchedMovies}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
