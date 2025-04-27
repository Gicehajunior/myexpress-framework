const { DataTypes } = require('sequelize');

class MEX {
    constructor() {
        // Logic applicable
    }


    /**
     * Mutates the DB fields into defined Sequelize columns
     * 
     * @param {Object} fields - Object where keys are field names, values are string types, DataTypes, or config objects
     * @returns {Object} Sequelize-compatible column fields
     */
    static mutateFields(fields, nullableFields=[]) {
        const fieldDefinitions = {}; 

        if (fields) {
            Object.entries(fields).forEach(([field, config]) => { 
                if (typeof config == 'string') {
                    fieldDefinitions[field] = {
                        type: DataTypes[config.toUpperCase()],
                        allowNull: nullableFields.includes(field)
                    };
                }
                else if (typeof config === 'function' && config.key) {
                    fieldDefinitions[field] = {
                        type: config,
                        allowNull: nullableFields.includes(field)
                    };
                }
                else if (typeof config === 'object' && config.type) {
                    fieldDefinitions[field] = {
                        ...config,
                        allowNull: config.allowNull ?? nullableFields.includes(field)
                    };
                }
            });
        }

        return fieldDefinitions;
    }
}

module.exports = MEX;