const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Protect all routes

router.post('/', addFavorite);
router.get('/', getFavorites);
router.delete('/:movieId', removeFavorite);

module.exports = router;
