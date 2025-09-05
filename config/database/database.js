const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const app_config = require('@config/config'); 
const database_config = require('@db/config'); 

class Database {
    /**
     * Initializes a Database class instance with multiple Sequelize connections.
     * Loads configurations from '@config/database/config.js' and creates Sequelize instances.
     * 
     * @param {object} options - Optional Sequelize-specific configuration overrides.
     * @param {object} logger - Optional custom logger (defaults to console).
     */
    constructor(set_db = app_config.DATABASE.DB_CONN, options = {}, logger = console) {
        if (Database.instance) return Database.instance;
        
        // Initialize singleton instance
        Database.instance = this;

        this.debug = app_config.APP.APP_DEBUG;
        
        this.databases = {};
        this.set_db = set_db;
        this.logger = logger;
        this.channel = 'application';
        this._setupDatabases(options);
    }

    /**
     * Sets up Sequelize connections for multiple databases.
     * Loops through configuration and initializes Sequelize for set database.
     * 
     * @param {object} options - Configuration options to override default settings for connections.
     */
    _setupDatabases(options = {}) { 
        for (const dbName in database_config) {
            if (dbName == this.set_db) {
                const dbConfig = database_config[dbName];
        
                let sequelizeInstance;
        
                if (dbConfig.DB_CONN === 'sqlite') {
                    let storage = dbConfig.SQLITE_STORAGE || ':memory:';
                    storage = (storage !== ':memory:') ? path.join(storage, dbConfig.DB_NAME) : storage;

                    sequelizeInstance = new Sequelize({
                        dialect: 'sqlite',
                        storage: storage,
                        logging: this.debug === 'true' ? this.logger.log : false,
                        ...options
                    });
                } else {
                    const sequelizeOptions = this._buildSequelizeOptions(dbConfig, options); 

                    sequelizeInstance = new Sequelize(
                        dbConfig.DB_NAME,
                        dbConfig.DB_USER,
                        dbConfig.DB_PASS ?? null,
                        sequelizeOptions
                    );
                }
        
                this.databases[dbName] = sequelizeInstance;
                this.databases[dbName].models = {};
                this._loadModels(dbName);
            }
        }
    }

    /**
     * Constructs Sequelize connection options.
     * 
     * @param {object} dbConfig - Database configuration (from @config/database/config.js).
     * @param {object} options - Optional configuration overrides for Sequelize options.
     * @returns {object} Sequelize connection options.
     */
    _buildSequelizeOptions(dbConfig, options) {
        const sequelizeOptions = {
            host: dbConfig.DB_HOST,
            port: dbConfig.DB_PORT,
            dialect: dbConfig.DB_CONN,
            logging: this.debug === 'true' ? this.logger.log : false,
            pool: {
                max: dbConfig.POOL.max || 10,
                min: dbConfig.POOL.min || 0,
                acquire: dbConfig.POOL.acquire || 30000,
                idle: dbConfig.POOL.idle || 10000
            },
            dialectOptions: {},
            timezone: app_config.DATABASE.MYSQL_TIMEZONE || '+03:00',
            ...options
        };

        // SSL options for MySQL/Postgres connections
        if (dbConfig.DB_SSL) {
            sequelizeOptions.dialectOptions.ssl = {
                require: dbConfig.DB_SSL || true,
                rejectUnauthorized: dbConfig.DB_UNAUTHORIZATION_CONTRAINT || true
            };
        }

        // Handle replication setup if needed
        if (dbConfig.REPLICATION) {
            sequelizeOptions.replication = dbConfig.REPLICATION;
        }

        return sequelizeOptions;
    }
    
    /**
     * Loads models dynamically for a given database connection.
     * Assumes models are located in the 'models' directory.
     * 
     * @param {string} dbName - The name of the database (e.g., 'mysql', 'postgres').
     */
    _loadModels(dbName) {
        
        const modelsDirectory = app_config.PATHS.MODELS; // Path to models directory
        
        try {
            if (this.channel == 'application') {
                this.getSequelize().then((sequelize) => { 
                    if (!fs.existsSync(modelsDirectory)) throw new Error(`Models directory does not exist at ${modelsDirectory}`);

                    const modelFiles = fs.readdirSync(modelsDirectory);
                    
                    modelFiles.forEach(file => { 
                        if (file.endsWith('.js')) {
                            try { 
                                const model = require(path.join(modelsDirectory, file));

                                // Initialize the model (check if it's a subclass of AppModel)
                                if (model.initModel) {
                                    sequelize.models[model.name] = model.initModel(sequelize);
                                } else {
                                    console.warn(`Model ${file} does not have an initModel method.`);
                                }
                            } catch (err) {
                                console.error(`Error loading model from file ${file}:`, err.message);
                            }
                        }
                    });

                    // Apply associations (if any) after loading all models
                    Object.values(this.databases[dbName].models).forEach(model => {
                        if (model.associate) {
                            try {
                                model.associate(this.databases[dbName].models);
                            } catch (err) {
                                console.error(`Error applying associations for model ${model.name}:`, err.message);
                            }
                        }
                    });
                });
            }
        } catch (err) {
            console.error(`Error loading models for database ${dbName}:`, err.message);
        }
    }

    /**
     * Retrieves the Sequelize instance for a specified database connection.
     * 
     * @param {undefined} channel - The channel to use the getSequelize method (application or migration).
     * @returns {Sequelize} Sequelize instance for the specified database connection.
     */
    async getSequelize(channel = 'application') {
        this.channel = channel;
        this.debug = app_config.APP.APP_DEBUG
        let db = app_config.DATABASE.DB_CONN;

        if (!this.databases[db]) {
            this.logger.error(`No database connection found for ${db}`);
        }  

        if (!this.debug) {
            await this.databases[db].authenticate()
                .then(() => this.logger.log(`${db} connected successfully.`))
                .catch(err => {
                    this.logger.error(`Unable to connect to ${db}:`, err.message);
                });
        }
        
        return this.databases[db];
    }
}

module.exports = new Database();
