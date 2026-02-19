import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    '[TMDB] Missing VITE_TMDB_API_KEY. API requests will fail until it is set.'
  );
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'en-US'
  },
  timeout: 10000
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error logging for observability
    // eslint-disable-next-line no-console
    console.error('[TMDB] Request failed:', error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default instance;

