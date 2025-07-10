import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import { voter } from './voter.js'
import { candidate } from './candidate.js'

export const vote = sequelize.define('vote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    voter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'voter',
        key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'candidate',
        key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'vote',
});

//Definición de las relaciones
voter.hasOne(vote, {foreignKey: 'voter_id'});
vote.belongsTo(voter, {foreignKey: 'voter_id'});

candidate.hasMany(vote, {foreignKey: 'candidate_id'});
vote.belongsTo(candidate, {foreignKey: 'candidate_id'});
