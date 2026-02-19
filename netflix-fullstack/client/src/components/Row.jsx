import React, { useState, useEffect } from 'react';
import tmdb from '../services/tmdb';

const IMAGE_BASE = "https://image.tmdb.org/t/p/";

function Row({ title, fetchUrl, movies: propMovies, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (propMovies) {
            setMovies(propMovies);
            setLoading(false);
            return;
        }

        if (!fetchUrl) return;

        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            try {
                const request = await tmdb.get(fetchUrl);
                if (!cancelled) {
                    const uniqueMovies = [];
                    const map = new Map();
                    for (const item of request.data.results) {
                        if (!map.has(item.id)) {
                            map.set(item.id, true);
                            uniqueMovies.push(item);
                        }
                    }
                    setMovies(uniqueMovies);
                }
            } catch (error) {
                console.error(`Row "${title}": fetch failed`, error.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => { cancelled = true; };
    }, [fetchUrl, propMovies]);

    const getImageSrc = (movie) => {
        const size = isLargeRow ? "w342" : "w300";
        const path = isLargeRow ? movie.poster_path : movie.backdrop_path;
        if (!path) return null;
        return `${IMAGE_BASE}${size}${path}`;
    };

    const skeletonWidth = isLargeRow ? "128px" : "200px";
    const skeletonHeight = isLargeRow ? "192px" : "112px";

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className={`row__poster row__poster--skeleton ${isLargeRow ? "row__posterLarge" : ""}`}
                            style={{ width: skeletonWidth, flexShrink: 0, height: skeletonHeight }}
                        />
                    ))
                    : movies
                        .filter((m) => (isLargeRow ? m.poster_path : m.backdrop_path))
                        .map((movie) => (
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                                src={getImageSrc(movie)}
                                alt={movie.name || movie.title || "Movie"}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ))}
            </div>
        </div>
    );
}

export default Row;
