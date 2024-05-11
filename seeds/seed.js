const sequelize = require('../config/connection');
const { Category, Question, Quiz, User, QuizQuestion, Score } = require('../models');

const categorySeedData = require('./categorySeedData');
const questionSeedData = require('./questionSeedData');
const userSeedData = require('./userSeedData');
const quizSeedData = require('./quizSeedData');
const quizQuestionSeedData = require('./quizQuestionSeedData');
const scoreSeedData = require('./scoreSeedData');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userSeedData);
    console.log('Users seeded successfully.');
    const categories = await Category.bulkCreate(categorySeedData);
    console.log('Categories seeded successfully.');
    const questions = await Question.bulkCreate(questionSeedData);
    console.log('Questions seeded successfully.');
    const quiz = await Quiz.bulkCreate(quizSeedData);
    console.log('Quizzes seeded successfully.'); 
    const quizquestions = await QuizQuestion.bulkCreate(quizQuestionSeedData);
    console.log('QuizQuestions seeded successfully.');
    const scores = await Score.bulkCreate(scoreSeedData);
    console.log('Scores seeded successfully.');
  
    // const users = await User.bulkCreate(userSeedData);
    console.log('Database seeded successfully.');
    process.exit(0);
  
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();