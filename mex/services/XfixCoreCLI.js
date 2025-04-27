#!/usr/bin/env node

const chalk = require('chalk');
const { program } = require('commander');
const MigrationService = require('@services/MigrationService');

class XfixCoreCLI {
    constructor(migrationService) {
        this.migrationService = migrationService;
    }

    static async create() {
        const migrationService = await new MigrationService().init();
        return new XfixCoreCLI(migrationService);
    }

    createMigration() {
        program
            .command('make:migration <tableName>')
            .description('Create a new migration for the specified table')
            .action(async (tableName) => {
                try {
                    console.log(chalk.green(`Creating migration for table: ${tableName}...`));
                    await this.migrationService.createMigration(tableName);
                    console.log(chalk.green(`Migration for table "${tableName}" created successfully!`));
                } catch (error) {
                    console.error(chalk.red('Error creating migration:', error.message));
                }
            });
    }

    runMigrations() {
        program
            .command('migrate')
            .description('Run all pending migrations')
            .action(async () => {
                try {
                    console.log(chalk.blue('Running migrations...'));
                    await this.migrationService.runMigrations();
                    console.log(chalk.green('Migrations ran successfully!'));
                } catch (error) {
                    console.error(chalk.red('Error running migrations:', error.message));
                }
            });
    }

    rollbackMigration() {
        program
            .command('migrate:rollback')
            .description('Rollback the last migration')
            .action(async () => {
                try {
                    console.log(chalk.blue('Rolling back the last migration...'));
                    await this.migrationService.rollbackMigration();
                    console.log(chalk.green('Rollback successful!'));
                } catch (error) {
                    console.error(chalk.red('Error rolling back migration:', error.message));
                }
            });
    }

    checkMigrationStatus() {
        program
            .command('migrate:status')
            .description('Show the status of migrations')
            .action(async () => {
                try {
                    const status = await this.migrationService.checkMigrationStatus();
                    console.log(chalk.blue('Migration Status:'));
                    status.forEach((migration) => {
                        console.log(chalk.yellow(migration));
                    });
                } catch (error) {
                    console.error(chalk.red('Error fetching migration status:', error.message));
                }
            });
    }

    applicationStatus() {
        program
            .command('status')
            .description('Show the application status')
            .action(() => {
                console.log(chalk.green('Application is running!'));
            });
    }

    registerAllCommands() {
        this.createMigration();
        this.runMigrations();
        this.rollbackMigration();
        this.checkMigrationStatus();
        this.applicationStatus();
    }

    parseArguments() {
        program.parse(process.argv);
    }
}

module.exports = XfixCoreCLI;