const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// ================= REGISTER =================
exports.register = async (req, res) => {
    const { username, email, password, phone } = req.body;

    try {
        // Check if user already exists
        const [existing] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Insert user
        await pool.query(
            'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)',
            [username, email, hash, phone]
        );

        res.json({ success: true });

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};