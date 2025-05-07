const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Check both cookie and Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;