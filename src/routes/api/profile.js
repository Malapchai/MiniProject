const jwt = require('jsonwebtoken'); // Add this line at the top
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Token verification failed', error: err.message });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;