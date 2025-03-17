const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, config.APP.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
