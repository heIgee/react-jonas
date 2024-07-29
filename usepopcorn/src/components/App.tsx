import { useState } from 'react';

import Navbar from './Navbar';
import Logo from './Navbar/Logo';
import SearchBar from './Navbar/SearchBar';
import NumResults from './Navbar/NumResults';

import Main from './Main';
import Box from './common/Box';
import MovieList from './Movies/MovieList';
import WatchedSummary from './Watched/WatchedSummary';
import WatchedList from './Watched/WatchedList';

import { tempMovieData, tempWatchedData } from '../tempData';

export default function App() {
  const [movies] = useState(tempMovieData);
  const [watched] = useState(tempWatchedData);
  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar />
        <NumResults num={movies.length} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
