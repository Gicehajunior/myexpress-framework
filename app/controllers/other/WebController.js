const MEX = require('@mex/MEX');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@models/User');
const config = require('@config/config');

class WebController extends MEX{
    static async index(req, res) {
        return res.render("home", { title: "Home Page" });
    }
}

module.exports = WebController;