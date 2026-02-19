import React, { useState, useEffect } from 'react';
import tmdb from '../services/tmdb';
import requests from '../services/requests';
import api from '../services/api';

// Curated fallback movies with real TMDB backdrop images (no API key needed for these static URLs)
const FALLBACK_MOVIE = {
    title: "Stranger Things",
    overview:
        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", // Adjusted to be relative path, used with IMAGE_BASE in component if needed, or full url logic
};

function Banner() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await tmdb.get(requests.fetchNetflixOriginals);
                const results = response.data.results;
                if (results && results.length > 0) {
                    const randomIndex = Math.floor(Math.random() * results.length);
                    setMovie(results[randomIndex]);
                } else {
                    setMovie(FALLBACK_MOVIE);
                }
            } catch (error) {
                console.error("Banner: TMDB fetch failed, using fallback.", error);
                setMovie(FALLBACK_MOVIE);
            }
        }
        fetchData();
    }, []);

    const handleAddFavorite = async () => {
        if (!movie) return;
        try {
            await api.post('/favorites/add', { movieId: movie.id });
            alert("Added to My List!");
        } catch (error) {
            console.error("Failed to add favorite", error);
            alert(error.response?.data?.message || "Failed to add to favorites");
        }
    };

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    // Handle background image logic
    const backgroundImage = movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg"; // Fallback directly

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("${backgroundImage}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__button--play">▶ Play</button>
                    <button
                        className="banner__button banner__button--list"
                        onClick={handleAddFavorite}
                    >
                        + My List
                    </button>
                </div>
                <p className="banner__description">
                    {truncate(movie?.overview, 150)}
                </p>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner;
