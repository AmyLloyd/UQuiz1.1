const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Question, Quiz, QuizQuestion, Category, User } = require('../models');

//Get data for rendering quiz building page
router.get('/quiz', withAuth, async (req, res) => {
  try {
      const dbCategoryData = await Category.findAll({
          include: [
              {
                  model: Question,
                  attributes: [
                      'id',
                      'question_body',
                      'created_by_user_id',
                  ],
              },
          ],
      });
      const categories = dbCategoryData.map((category) =>
      category.get({ plain: true }));
      
      res.render('quiz-home', { 
          categories, 
          loggedIn: req.session.loggedIn
      });
  } catch (err) {
      console.error(err); // Log the error to the console for debugging
      res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const quizData = await Quiz.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
  const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));
  
  res.render('homepage', {
    quizzes,
    loggedIn: req.session.loggedIn
  });
} catch (err) {
  res.status(500).json(err);
}
});

//GET request at this route: http://localhost:3001/quiz/:id
//get request to render the page
router.get("/quiz/:id", withAuth, async (req, res) => {
  try {
    const dbQuizData = await Quiz.findByPk(req.params.id, {
      include: [
        {
          model: Question,
          through: QuizQuestion,
          as: "questions",
          attributes: [
            "id",
            "question_body",
            "choice_a",
            "choice_b",
            "choice_c",
            "choice_d",
            "answer",
            "category_id",
            "created_by_user_id",
          ],
        },
      ],
    });
 
    const quiz = dbQuizData.get({ plain: true });

    console.log("Rendering quizzes", quiz);

    return res.render("quiz-page", { loggedIn: req.session.loggedIn, quiz });
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error', details: err.message });
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Assuming user_id and user_username are stored in the session
    const userPage = {
      user_id: req.session.user_id,
      username: req.session.username,
    };
    const categories = await Category.findAll();
    const categoryData = categories.map(category => category.toJSON());

    // Pass the user data and categories to the 'profile' template
    res.render('profile', { loggedIn: req.session.loggedIn, userPage, categories: categoryData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render("login")
})

module.exports = router;

