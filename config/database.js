const { Sequelize } = require("sequelize");
const config = require("@config/config"); // Import custom configurations
require("dotenv").config(); // Ensure environment variables are loaded

class Database {
  constructor() { 
    this.sequelize = new Sequelize(
      config.DATABASE.DB_NAME,
      config.DATABASE.DB_USER,
      config.DATABASE.DB_PASSWORD,
      {
        host: config.DATABASE.DB_HOST,
        port: config.DATABASE.DB_PORT,
        dialect: config.DATABASE.DB_CONNECTION,
        logging: config.APP_DEBUG ? console.log : false, // Enable logging if debugging
        dialectOptions: {
          ssl: config.DATABASE.DB_SSL , // Optional SSL setting
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
  }

  // Initialize Database Connection
  async init() {
    try {
      await this.sequelize.authenticate();
      console.log("Database connected successfully!");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  }

  getSequelize() {
    return this.sequelize;
  }
}

// Export a Singleton Instance
const databaseInstance = new Database();
module.exports = databaseInstance;
