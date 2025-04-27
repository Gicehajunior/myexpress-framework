const Util = require('@utils/Util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User'); 

class UserUtil extends Util {
    constructor() {
        super();
    }

    async userExistsById(id) {
        const user = await User.findOne({ where: { id } });
        return user ? true : false;
    }

    async getUserById(id) {
        return await User.findOne({ where: { id } });
    } 

    async getAllUsers() {
        return await User.findAll();
    } 
}

module.exports = new UserUtil();