const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Question model
class Question extends Model {}

//create fields/columns for Question model
Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        question_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice_a: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice_b: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice_c: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice_d: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //This column will store a reference of the questions in the category model
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id',
            },
        },
        created_by_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'question'
    }
);

module.exports = Question;