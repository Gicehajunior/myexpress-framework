const Util = require('@utils/Util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User');
const db = require('@config/database');

class UserUtil extends Util {
    constructor() {
        // 
    }

    async userExistsById(id) {
        const user = await User.findOne({ where: { id } });
        return user ? true : false;
    }

    async getUserById(id) {
        return await User.findOne({ where: { id } });
    } 
}

module.exports = new UserUtil();