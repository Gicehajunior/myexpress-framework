const { DataTypes, Model } = require('sequelize');
const db = require('../../config/database');

class Journal extends Model {
    constructor() {
        // 
    }
}

Journal.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize: db.getSequelize(), modelName: 'Journal' });

module.exports = Journal;
