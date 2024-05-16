const router = require('express').Router();
const { Question, Category } = require('../../models/index')
const withAuth = require('../../utils/auth');

//GET request that will dynamically render options for the category and user select menu 
router.get('/', withAuth, async (req, res) => {
    try {
        const dbQuestionData = await Question.findAll({
            include: [
                {
                    model: Category,
                    attributes: [
                        'id',
                        'category_name',
                    ],
                },
            ],
        });
        const questions = dbQuestionData.map((question) =>
        question.get({ plain: true }));
        
        res.render('example', {
            questions
        });
    } catch (err) {
        console.error(err); // Log the error to the console for debugging
        res.status(500).json(err);
    }
});

//GET request at this route http://localhost:3001/api/questions for getting a quiz with the same category
router.get('/:category_id', withAuth, async (req, res) => {
    try {
        const questionDisp = await Question.findAll({
            where: { category_id: req.params.category_id }
        });
        if (!questionDisp) {
            res.status(400);
            res.json({ message: 'Question not found' });
        } else {
            res.status(200).json(questionDisp);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// need to ensure question data is being send in correctly from the views
router.post('/profile', withAuth, async (req, res) => {
    try {
        // Log the raw request body
        console.log('Raw Request Body:', req.body);

        // Parse the JSON data
        const questionData = Question.create({
            question_body: req.body.question_body,
            choice_a: req.body.choice_a,
            choice_b: req.body.choice_b,
            choice_c: req.body.choice_c,
            choice_d: req.body.choice_d,
            answer: req.body.answer,
            category_id: req.body.category_id,
            created_by_user_id: req.session.user_id,
        });

        res.status(200).json(questionData);
        console.log('Submission Successful');
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;