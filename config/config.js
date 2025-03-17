require('dotenv').config();
const path = require('path');

module.exports = {
    APP: {
        APP_NAME: process.env.APP_NAME || 'My Express',
        APP_ENV: process.env.APP_ENV || 'development',
        APP_PORT: process.env.APP_PORT || 5000,
        APP_URL: process.env.APP_URL || 'http://127.0.0.1',
        APP_SECRET: process.env.APP_SECRET || 'supersecretkey',
        JWT_SECRET: process.env.JWT_SECRET || 'jwtsecretkey',
        APP_DEBUG: process.env.APP_DEBUG || true,
    },
    VIEW_ENGINE: process.env.VIEW_ENGINE || 'ejs',
    PATHS: {
        ROUTES: process.env.ROUTES_PATH || path.join(__dirname, '../routes'),
        VIEWS: process.env.VIEWS_PATH || path.join(__dirname, '../resources'),
        PUBLIC: process.env.PUBLIC_PATH || path.join(__dirname, '../public'),
    },
    DATABASE: {
        DB_CONNECTION: process.env.DB_CONNECTION || 'mysql',
        DB_HOST: process.env.DB_HOST || '127.0.0.1',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_NAME: process.env.DB_NAME || 'myexpress',
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || '',
        DB_SSL: process.env.DB_SSL || false 
    },
    AUTH: {
        JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
        TOKEN_EXPIRY: process.env.TOKEN_EXPIRY || '24h',
        BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
    },
    MAIL: {
        HOST: process.env.MAIL_HOST || '',
        PORT: process.env.MAIL_PORT || '465',
        SOURCE_ADDRESS: process.env.MAIL_SOURCE_ADDRESS || '',
        SOURCE_USERNAME: process.env.MAIL_SOURCE_USERNAME || 'MyExpress Framework',
        ENCRYPTION: process.env.MAIL_ENCRYPTION_CRITERIA || 'ssl',
    },
    ROUTES: {
        PREFIX: '/api',
    },
};
