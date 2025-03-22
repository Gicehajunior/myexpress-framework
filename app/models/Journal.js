const { DataTypes, Model } = require('sequelize');
const db = require('@config/database');

class Journal extends Model {
    static tableName = 'journal'; 

    static query(sequelize) { 
        Journal.init({
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            title: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: false },
            category_id: { type: DataTypes.INTEGER, allowNull: true },
            attachments: { type: DataTypes.TEXT, allowNull: true },
            status: { type: DataTypes.TEXT, allowNull: false },
            date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        }, {  
            sequelize,  
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: Journal.tableName,
        });    
    }
}

Journal.query(db.getSequelize());
module.exports = Journal;
