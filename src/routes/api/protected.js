const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
	const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
	if (!token) return res.sendStatus(401); // Unauthorized

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403); // Forbidden
		req.user = user; // Attach user info from token
		next();
	});
}
