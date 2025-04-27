const fs = require('fs');
const path = require('path');  
const chalk = require('chalk');  
const config = require('@config/config'); 
const Database = require('@db/database');

class MigrationService {
    constructor() {
        // Define the migrations directory path 
        this._sequelize = null; 

        this.queryInterface = null;
        this.sequelize = null;
        this.migrationsPath = config.PATHS.MIGRATIONS;
    } 
    
    async init() { 
        this._sequelize = await Database.getSequelize('migration');
        this.queryInterface = this._sequelize.getQueryInterface();
        this.sequelize = this._sequelize.constructor;
        return this;
    }

    // Create a migration file
    async createMigration(tableName) {
        const migrationFileName = `${tableName}_migration_${Date.now()}.js`;

        // Check if migrations directory exists, create it if not
        if (!fs.existsSync(this.migrationsPath)) {
            fs.mkdirSync(this.migrationsPath);
        }

        const migrationTemplate = `
        /**
         * Migration template for creating the ${tableName} table.
         */
        module.exports = {
            up: async (queryInterface, Sequelize) => {
                // Write migration logic here
                await queryInterface.createTable('${tableName}', {
                    // Define your columns here
                    // Example:
                    // id: {
                    //     type: Sequelize.INTEGER,
                    //     primaryKey: true,
                    //     autoIncrement: true
                    // }
                });
            },
            down: async (queryInterface, Sequelize) => {
                // Rollback migration
                await queryInterface.dropTable('${tableName}');
            }
        };`;

        const beautify = require('js-beautify').js;

        // Beautify the migration template
        const formattedTemplate = beautify(migrationTemplate, {
            indent_size: 4,
            space_in_empty_paren: true
        });

        // Write the migration template to a file
        fs.writeFileSync(path.join(this.migrationsPath, migrationFileName), formattedTemplate);
    }

    // Run all migrations
    async runMigrations() {
        const migrationFiles = fs.readdirSync(this.migrationsPath).filter(file => file.endsWith('.js')); 
        
        for (const migrationFile of migrationFiles) { 
            const migration = require(path.join(this.migrationsPath, migrationFile));

            console.log(chalk.green(`Running migration: ${migrationFile}`));

            await migration.up(this.queryInterface, this.sequelize);
            return true; 
        }
    }

    // Rollback the last migration
    async rollbackMigration() {
        const migrationFiles = fs.readdirSync(this.migrationsPath).filter(file => file.endsWith('.js'));
        
        const lastMigrationFile = migrationFiles[migrationFiles.length - 1]; 
        const migration = require(path.join(this.migrationsPath, lastMigrationFile));

        console.log(chalk.blue(`Rolling back migration: ${lastMigrationFile}`));

        await migration.down(this.queryInterface, this.sequelize); 
    }

    // Check the status of migrations (show applied migrations)
    async checkMigrationStatus() {
        const migrationFiles = fs.readdirSync(this.migrationsPath).filter(file => file.endsWith('.js'));
        return migrationFiles;
    }
}

module.exports = MigrationService;
