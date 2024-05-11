const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Score model
class Score extends Model {}

//create fields/columns for score model
Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'quiz',
                key: 'id',
                unique: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        score: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'score'
    }
);

module.exports = Score;