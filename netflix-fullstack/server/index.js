require('dotenv').config(); // MUST BE FIRST

const express = require('express');
const cors = require('cors');
const { testConnection, pool } = require('./config/db');

const authRoute = require('./routes/auth');
const favoritesRoute = require('./routes/favorites');

const app = express();

/* ===============================
   GLOBAL MIDDLEWARE
   ================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
   ================================ */
app.use('/api/auth', authRoute);
app.use('/api/favorites', favoritesRoute);

/* ===============================
   HEALTH / TEST ROUTES
   ================================ */
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
            success: true,
            database: process.env.DB_NAME,
            status: "healthy",
            serverTime: new Date()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: "unhealthy",
            error: error.message
        });
    }
});

/* ===============================
   GLOBAL ERROR HANDLER
   ================================ */
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

/* ===============================
   START SERVER
   ================================ */
const startServer = async () => {
    try {
        await testConnection(); // Ensure DB works and tables exist

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log("==================================");
            console.log(`✅ MySQL Connected`);
            console.log(`🚀 Backend running on port ${PORT}`);
            console.log("==================================");
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
