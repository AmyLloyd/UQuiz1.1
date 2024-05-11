const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create QuizQuestion model
class QuizQuestion extends Model {}

//create fields/columns for quizquestion model
QuizQuestion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'question',
                key: 'id',
                unique: false
            }
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'quiz',
                key: 'id',
                unique: false
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quizQuestion'
    }
);

module.exports = QuizQuestion;