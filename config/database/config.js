const path = require('path');
const config = require('@config/config');

/**
 * Configuration for database connections.
 * This file contains connection settings for multiple databases (MySQL, PostgreSQL, etc.).
 * Each database configuration can be accessed by its key (e.g., 'mysql', 'postgres').
 * 
 * @example
 * const config = require('@config/database/config');
 * const mysqlConfig = config.mysql;  // Access MySQL config
 * 
 * @module config/database/config
 */
module.exports = {
    mysql: {
        DB_CONN: config.DATABASE.DB_CONN || 'mysql2', // mysql2 for MySQL
        DB_HOST: config.DATABASE.DB_HOST || '127.0.0.1',
        DB_PORT: config.DATABASE.DB_PORT || '3306',
        DB_NAME: config.DATABASE.DB_NAME || 'xfixcore',
        DB_USER: config.DATABASE.DB_USER || 'root',
        DB_PASS: config.DATABASE.DB_PASS || '',
        DB_SSL: config.DATABASE.DB_SSL || false, // Use SSL connection or not
        POOL: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        REPLICATION: null,  // Set replication if needed
    },

    mariadb: {
        DB_CONN: config.DATABASE.DB_CONN || 'mariadb', // mariadb for MariaDB
        DB_HOST: config.DATABASE.DB_HOST || '127.0.0.1',
        DB_PORT: config.DATABASE.DB_PORT || '3306',
        DB_NAME: config.DATABASE.DB_NAME || 'xfixcore',
        DB_USER: config.DATABASE.DB_USER || 'root',
        DB_PASS: config.DATABASE.DB_PASS || '',
        DB_SSL: config.DATABASE.DB_SSL || false,
        POOL: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        REPLICATION: null,
    },

    postgres: {
        DB_CONN: config.DATABASE.DB_CONN || 'postgres', // postgres for PostgreSQL
        DB_HOST: config.DATABASE.DB_HOST || '127.0.0.1',
        DB_PORT: config.DATABASE.DB_PORT || '5432',
        DB_NAME: config.DATABASE.DB_NAME || 'xfixcore',
        DB_USER: config.DATABASE.DB_USER || 'user',
        DB_PASS: config.DATABASE.DB_PASS || 'password',
        DB_SSL: config.DATABASE.DB_SSL || true,
        POOL: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        REPLICATION: null,
    },

    sqlite: {
        DB_CONN: config.DATABASE.DB_CONN || 'sqlite', // sqlite3 for SQLite
        DB_HOST: config.DATABASE.DB_HOST || 'localhost',  // SQLite uses file-based connections
        DB_PORT: config.DATABASE.DB_PORT || null,
        DB_NAME: config.DATABASE.DB_NAME || 'xfixcore.sqlite',  // Path to SQLite file
        DB_USER: config.DATABASE.DB_USER || null, // Not required
        DB_PASS: config.DATABASE.DB_PASS || null, // Not required
        DB_SSL: config.DATABASE.DB_SSL || false,
        SQLITE_STORAGE: path.join(path.resolve('.'), 'config/database/dump'), // storage path for sqlite
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        REPLICATION: null,
    },

    mssql: {
        DB_CONN: config.DATABASE.DB_CONN || 'mssql', // tedious for Microsoft SQL Server
        DB_HOST: config.DATABASE.DB_HOST || '127.0.0.1',
        DB_PORT: config.DATABASE.DB_PORT || '1433',
        DB_NAME: config.DATABASE.DB_NAME || 'xfixcore',
        DB_USER: config.DATABASE.DB_USER || 'sa',
        DB_PASS: config.DATABASE.DB_PASS || 'password',
        DB_SSL: config.DATABASE.DB_SSL || false,
        POOL: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        REPLICATION: null,
    },

    oracle: {
        DB_CONN: config.DATABASE.DB_CONN || 'oracle', // oracledb for Oracle
        DB_HOST: config.DATABASE.DB_HOST || '127.0.0.1',
        DB_PORT: config.DATABASE.DB_PORT || '1521',
        DB_NAME: config.DATABASE.DB_NAME || 'xfixcore',
        DB_USER: config.DATABASE.DB_USER || 'system',
        DB_PASS: config.DATABASE.DB_PASS || 'password',
        DB_SSL: config.DATABASE.DB_SSL || false,
        POOL: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        REPLICATION: null,
    },
};
