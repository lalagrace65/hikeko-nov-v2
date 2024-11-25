const jwt = require('jsonwebtoken');
const bcryptSalt = 10; 
const jwtSecret = 'wsdfghjkqisoaklfksld';

function requireRole(roles) {
    return (req, res, next) => {
        const token = req.cookies.token;

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

            // Attach user data to request
            req.userId = userData.id; 
            req.userRole = userData.role;
            req.userData = userData;
            next();
        });
    };
}

module.exports = { requireRole, jwtSecret, bcryptSalt };
