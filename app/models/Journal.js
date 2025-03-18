const { DataTypes, Model } = require('sequelize');
const db = require('@config/database');

class Journal extends Model {
    static tableName = 'users';

    constructor() {
        super()
    }

    static query() {
        const sequelize = db.getSequelize();
        return sequelize.define("Journal", {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            title: { type: DataTypes.STRING, allowNull: false },
            content: { type: DataTypes.TEXT, allowNull: false },
            category: { type: DataTypes.STRING, allowNull: false },
            date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        }, {  
            sequelize: sequelize,  
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: Journal.tableName,
        });    
    }
}

module.exports = Journal;
