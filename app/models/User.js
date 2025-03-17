const { DataTypes, Model } = require('sequelize');
const db = require('../../config/database');

class User extends Model {
    constructor() {
        // 
    }
}

User.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, { sequelize: db.getSequelize(), modelName: 'User' });

module.exports = User;
