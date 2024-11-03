// middleware/auth.js
const jwt = require('jsonwebtoken');

const jwtSecret = 'wsdfghjkqisoaklfksld'; // Replace with your actual secret
const bcryptSalt = 10;

function requireRole(roles) {
    return (req, res, next) => {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) {
                return res.status(403).json({ message: 'Access denied' });
            }

            // Check if user role is one of the allowed roles
            if (!roles.includes(userData.role)) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            next();
        });
    };
}

module.exports = { requireRole, jwtSecret, bcryptSalt };
