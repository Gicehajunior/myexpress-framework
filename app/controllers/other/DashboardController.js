const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User');
const Journal = require('@models/Journal');

class DashboardController {
    static async index(req, res) { 
        const status = req.session.status ?? null;
        const message = req.session.message ?? null;
        return res.render("crm/dashboard", { title: "Dashboard Page", status: status, message: message, user: req.session.user });
    } 
}

module.exports = DashboardController;
