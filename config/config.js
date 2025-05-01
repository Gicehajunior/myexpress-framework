require('dotenv').config();
const path = require('path');

module.exports = {
    APP: {
        APP_NAME: process.env.APP_NAME || 'MEX Framework',
        APP_ENV: process.env.APP_ENV || 'development',
        APP_PORT: process.env.APP_PORT || 8200,
        APP_URL: process.env.APP_URL || 'http://127.0.0.1:5000',
        APP_SECRET: process.env.APP_SECRET || 'af63ff81e7d3b9d85ff76b2f59b3b7f350186bd7c0c4e513d852a0634a81c722',
        JWT_SECRET: process.env.JWT_SECRET || 'jwtsecretkey',
        SESSION_SECRET: process.env.SESSION_SECRET || 'af63ff81e7d3b9d85ff76b2f59b3b7f350186bd7c0c4e513d852a0634a81c722',
        APP_DEBUG: process.env.APP_DEBUG || true,
        APP_TIMEZONE: process.env.APP_TIMEZONE || "Africa/Nairobi",
        COUNTRY_CODE: process.env.COUNTRY_CODE || 'KE',
    },
    VIEW_ENGINE: process.env.VIEW_ENGINE || 'ejs',
    PATHS: {
        MIGRATIONS: path.join(path.resolve('.'), 'database/migrations'),
        CONTROLLERS: path.join(path.resolve('.'), 'app/https/controllers'),
        MODELS: path.join(path.resolve('.'), 'app/models'),
        ROUTES: process.env.ROUTES_PATH || path.join(path.resolve('.'), 'routes'),
        VIEWS: process.env.VIEWS_PATH || path.join(path.resolve('.'), 'resources'),
        PUBLIC: process.env.PUBLIC_PATH || path.join(path.resolve('.'), 'public'),
        STORAGE: path.join(path.resolve('.'), 'public/store'),
    }, 
    DATABASE: {
        DB_CONN: process.env.DB_CONN || 'mysql',
        DB_HOST: process.env.DB_HOST || '127.0.0.1',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_NAME: process.env.DB_NAME || 'myexpress',
        DB_USER: process.env.DB_USER || 'root',
        DB_PASS: process.env.DB_PASS || '',
        DB_SSL: process.env.DB_SSL || false,
        UNAUTHORIZATION_CONTRAINT: process.env.UNAUTHORIZATION_CONTRAINT || false,
        OPTIONS: {},
        LOGGER: undefined,
        MYSQL_TIMEZONE: '+03:00'
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
    REQUESTS: {
        ALLOW_HEADERS_LIST: {
            'Content-Security-Policy': "script-src 'self' https://cdn.ckeditor.com"
            // Add new or other headers applicable.
        }
    },
    UPLOADS: {
        AUTOSAVE: false,
        AUTORENAME: true,
        MAX_UPLOADS: 100,
        MAX_FILE_SIZE: 5 * 1024 * 1024,
        ALLOWED_FILE_TYPES: [
            "image/png", 
            "image/jpeg", 
            "image/jpg", 
            "application/pdf"
        ],
        PRESERVE_PATH: false,
        UNIQUE_UPLOAD_NAME: ''
    },
    SESSION: {
        SESSION_NAME: "myexpress.auth_session", // leave empty to default to connect.sid
        RESAVE: false,
        PROXY: true,
        CLEAR: true
    },
    COOKIES: { 
        MAXAGE: 24 * 60 * 60 * 1000,
        SECURE: process.env.APP_ENV === 'production',
        HTTPONLY: true,
        SAMESITE: false, // or Lax, Strict, None, or false
        MAXAGE: null,
        PATH: '/',
        DOMAIN: '',
        REFRESH: true
    }
};
