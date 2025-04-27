/**
 * Migration template for creating the users table.
 */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Write migration logic here
        await queryInterface.createTable('users', {
            // Define your columns here
            // Example:
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            fullname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contact: {
                type: Sequelize.STRING,
                allowNull: true
            },
            reset_pass_security_code: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            rolename: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        // Rollback migration
        await queryInterface.dropTable('users');
    }
};