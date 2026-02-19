import { useEffect, useState } from 'react';
import api from '../services/api.js';
import styles from './Row.module.css';

const baseUrl = 'https://image.tmdb.org/t/p/w300';

function getPosterPath(movie, isLargeRow) {
  if (!movie) return null;
  const path = isLargeRow
    ? movie?.poster_path
    : movie?.backdrop_path || movie?.poster_path;
  return path || null;
}

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await api.get(fetchUrl);
        const results = response.data?.results || [];
        if (isMounted) {
          setMovies(results);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[Row] Failed to fetch movies', error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchUrl]);

  return (
    <section className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.posters}>
        {movies.map((movie) => {
          const path = getPosterPath(movie, isLargeRow);
          if (!path) {
            return null;
          }

          return (
            <img
              key={movie.id}
              className={`${styles.poster} ${
                isLargeRow ? styles.posterLarge : ''
              }`}
              src={`${baseUrl}${path}`}
              alt={movie.title || movie.name}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Row;

