//Import the Model files
const User = require('./User');
const Quiz = require('./Quiz');
const Question = require('./Question');
const Category = require('./Category');
const QuizQuestion = require('./QuizQuestion');
const Score = require('./Score');

// Define associations
User.hasMany(Quiz, {
  foreignKey: 'user_id', // foreign key in the Quiz model referring to the User model
  onDelete: 'CASCADE',
});

Quiz.belongsTo(User, {
  foreignKey: 'user_id', // foreign key in the Quiz model referring to the User model
});

Quiz.belongsToMany(Question, {
  through: 'quizQuestion', // You need to create a model for the QuizQuestion association
  as: 'questions',
});

Question.belongsToMany(Quiz, {
  through: 'quizQuestion', // You need to create a model for the QuizQuestion association
  as: 'quizzes',
});

User.hasMany(Question, {
  foreignKey: 'created_by_user_id', // foreign key in the Question model referring to the User model
  onDelete: 'CASCADE',
});

Question.belongsTo(User, {
  foreignKey: 'created_by_user_id', // foreign key in the Question model referring to the User model
});

Category.hasMany(Question, {
    foreignKey: 'category_id', // foreign key in the Question model referring to the Category model
    onDelete: 'CASCADE',
});

Question.belongsTo(Category, {
    foreignKey: 'category_id', //foreign key in the Question model referring to the Category model
});

Score.belongsTo(User, { 
  foreignKey: 'user_id' 
});

Score.belongsTo(Quiz, {
   foreignKey: 'quiz_id' 
});

module.exports = { User, Quiz, Question, Category, QuizQuestion, Score};
