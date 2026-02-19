const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [users] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = users[0];
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }
};
