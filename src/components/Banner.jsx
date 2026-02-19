import { useEffect, useState } from 'react';
import api from '../services/api.js';
import requests from '../services/requests.js';
import styles from './Banner.module.css';

const baseUrl = 'https://image.tmdb.org/t/p/original';

function getTitle(movie) {
  return movie?.title || movie?.name || movie?.original_name || '';
}

function truncate(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await api.get(requests.fetchNetflixOriginals);
        const results = response.data?.results || [];
        if (!results.length || !isMounted) return;
        const randomIndex = Math.floor(Math.random() * results.length);
        setMovie(results[randomIndex]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[Banner] Failed to fetch Netflix originals', error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const imagePath = movie?.backdrop_path || movie?.poster_path || null;

  return (
    <section
      className={styles.banner}
      style={
        imagePath
          ? {
              backgroundImage: `url(${baseUrl}${imagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }
          : undefined
      }
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{getTitle(movie)}</h1>
        {movie?.overview && (
          <p className={styles.description}>
            {truncate(movie.overview, 170)}
          </p>
        )}
        <div className={styles.actions}>
          <button type="button" className={`${styles.button} ${styles.primary}`}>
            Play
          </button>
          <button type="button" className={styles.button}>
            My List
          </button>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}

export default Banner;

