const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User');
const db = require('@config/database');
const CryptoJS = require('crypto-js'); 

class Util {
    static encodeMessage(message) {
        try {
            const secretKey = config.APP.APP_SECRET;
            const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
            return encodeURIComponent(encrypted);
        } catch (error) {
            console.error("Error encoding message:", error);
            return null;
        }
    }

    static decodeMessage(message) {
        try {
            const secretKey = config.APP.APP_SECRET;
            const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(message), secretKey);
            const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedMessage) throw new Error("Invalid decryption result"); 
            return decryptedMessage;
        } catch (error) {
            console.error("Error decoding message:", error);
            return null;
        }
    }
}

module.exports = Util;