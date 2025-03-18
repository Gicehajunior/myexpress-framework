const { DataTypes, Model } = require('sequelize');
const db = require('@config/database');

class User extends Model {
    static tableName = 'users';

    constructor() {
        super();
    }

    static query() { 
        const sequelize = db.getSequelize();
        return sequelize.define("User", {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            username: { type: DataTypes.STRING, allowNull: true, unique: false },
            email: { type: DataTypes.STRING, allowNull: true, unique: false },
            contact: { type: DataTypes.STRING, allowNull: true, unique: false },
            password: { type: DataTypes.STRING, allowNull: true },
        }, { 
            sequelize: sequelize,  
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: User.tableName,
        }); 
    }
}

module.exports = User;