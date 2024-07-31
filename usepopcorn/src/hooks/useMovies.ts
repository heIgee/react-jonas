import { useEffect, useState } from 'react';
import Movie from '../models/Movie';

const OMDB_KEY = '1295ffd6';

interface OmdbResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export const useMovies = (
  query: string,
  onSuccess?: () => void,
  delay: number = 500,
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timerId = setTimeout(() => {
      (async function fetchMovies() {
        try {
          setError(null);

          if (!query || query.length < 3) return;

          setIsLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?s=${query.trim()}&apikey=${OMDB_KEY}`,
            { signal: controller.signal },
          );

          const data: OmdbResponse = await res.json();
          console.log(data);
          if (data.Response === 'True') {
            setMovies(data.Search);
          } else {
            throw new Error('Movies not found');
          }
          onSuccess?.();
        } catch (err) {
          if ((err as Error).name === 'AbortError') return;
          console.error(err as Error);
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      })();
    }, delay);
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [query, onSuccess, delay]);

  return { movies, isLoading, error };
};
