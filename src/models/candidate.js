import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'

export const candidate = sequelize.define('candidate', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    party: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    tableName: 'candidate',
});