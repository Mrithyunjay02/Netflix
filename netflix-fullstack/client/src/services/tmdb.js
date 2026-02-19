import axios from "axios";

// Dedicated TMDB axios instance — used by Row.jsx and Banner.jsx for movie data.
// The API key is embedded in each URL string inside requests.js,
// so no params config is needed here.
const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default tmdb;
