const jwt = require('jsonwebtoken');
const config = require('@config/config');
const Util = require('@utils/Util');

module.exports = (req, res, next) => { 
    try {  
        const token = req.session.token || req.headers.cookie;
        if (!token) {
            req.flash('status', 'error');
            req.flash('message', 'Access denied. Please Log in again!');
            res.redirect(`/login?auth=${Util.encodeMessage('You have logged out successfully.')}`);
        }

        const decoded = jwt.verify(token, config.APP.JWT_SECRET);
        req.session.user = decoded; 
        next();
    } catch (error) {
        req.flash('status', 'error');
        req.flash('message', error.message ?? 'Invalid token');
        res.redirect(`/login?auth=${Util.encodeMessage('You have logged out successfully.')}`); 
    }
};
