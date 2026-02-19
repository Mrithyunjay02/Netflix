const { pool } = require('../config/db');

exports.addFavorite = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user.id;

    if (!movieId) {
        return res.status(400).json({
            success: false,
            message: "Movie ID is required"
        });
    }

    try {
        await pool.query(
            'INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)',
            [userId, movieId]
        );

        res.status(201).json({
            success: true,
            message: "Movie added to favorites"
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: "Movie already in favorites"
            });
        }
        console.error("Add Favorite Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getFavorites = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await pool.query(
            'SELECT movie_id, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error("Get Favorites Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.removeFavorite = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await pool.query(
            'DELETE FROM favorites WHERE user_id = ? AND movie_id = ?',
            [userId, movieId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        res.json({
            success: true,
            message: "Movie removed from favorites"
        });
    } catch (error) {
        console.error("Remove Favorite Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
