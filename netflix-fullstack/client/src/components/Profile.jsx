import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import tmdb from '../services/tmdb';
import Row from './Row';

function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;
            try {
                // 1. Get IDs from backend
                const { data } = await api.get('/favorites/list');
                const movieIds = data.favorites;

                if (movieIds.length > 0) {
                    // 2. Fetch details from TMDB for each ID
                    // Note: TMDB API key is needed. We use the instance from services/tmdb which has baseURL.
                    // But we need the API key for individual movie details `GET /movie/{movie_id}`.
                    // The API Key is in import.meta.env.VITE_TMDB_API_KEY
                    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

                    const requests = movieIds.map(id =>
                        tmdb.get(`/movie/${id}?api_key=${apiKey}&language=en-US`)
                            .then(res => res.data)
                            .catch(err => null) // Ignore failed fetches
                    );

                    const results = await Promise.all(requests);
                    setFavoriteMovies(results.filter(m => m !== null));
                }
            } catch (error) {
                console.error("Failed to fetch favorites", error);
            }
        };

        fetchFavorites();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile">
            <Nav />
            <div className="profile__body">
                <h1>Edit Profile</h1>
                <div className="profile__info">
                    <img
                        className="profile__avatar"
                        src="/netflix-avatar.svg"
                        alt="Avatar"
                    />
                    <div className="profile__details">
                        <h2 className="profile__name">{user?.name || 'User'}</h2>
                        <button onClick={handleLogout} className="profile__signOut">
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="profile__plans">
                    <h3>My List</h3>
                    {favoriteMovies.length > 0 ? (
                        <Row title="" movies={favoriteMovies} isLargeRow />
                    ) : (
                        <p>No favorites added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
