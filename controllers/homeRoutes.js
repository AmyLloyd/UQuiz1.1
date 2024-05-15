const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Question, Quiz, QuizQuestion, Category } = require('../models');

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/account');
    return;
  }
  res.render("login")
})

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
          categories
      });
  } catch (err) {
      console.error(err); // Log the error to the console for debugging
      res.status(500).json(err);
  }
});


router.get("/", (req, res) => {
  res.render("homepage")
})

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

    return res.render("quiz-page", { loggedIn: true, quiz });
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error', details: err.message });
  }
});

router.get('/account', withAuth, async (req, res) => {
  try {
    // Assuming user_id and user_username are stored in the session
    const userPage = {
      user_id: req.session.user_id,
      username: req.session.user_username,
    };

    const categories = await Category.findAll();
    const categoryData = categories.map(category => category.toJSON());

    // Pass the user data and categories to the 'account' template
    res.render('account', { loggedIn: true, userPage, categories: categoryData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;

