const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Question, Quiz, QuizQuestion, Score, Category } = require('../../models');

//get route for quizData to send to quiz-home js file for dynamically rendering premade quizzes
router.get('/data', withAuth, async (req, res) => {
    try {
        const quizData = await Quiz.findAll({
            include: [
                {
                    model: Question, 
                    through: QuizQuestion,
                    as: "questions",
                    attributes: [
                        "id",
                        "question_body", 
                        "created_by_user_id",
                    ],
                }
            ]
        })    
        res.status(200).json(quizData); 
        
    } catch (err) {
        res.status(500).json({ error: "Error getting quiz and question data", details: err });
    }
});

//get route for quizData to send to js file to dynamically render
router.get(`/data/:id`, withAuth, async (req, res) => {
    try {

        const quizData = await Quiz.findByPk(req.params.id, {
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
                        "created_by_user_id",
                    ],
                },
            ],
        });
        
        res.status(200).json(quizData) 
        
    } catch (err) {
        res.status(500).json(err);
    }});

    //Get request for scoreData
router.get('/data/score/:id', async (req, res) => {
    try {
        const scoreData = await Score.findAll({
            where: {
                quiz_id: req.params.id
            },
        });
    
    console.log("scoreData", scoreData);

    res.status(200).json(scoreData) 
        
    } catch (err) {
        res.status(500).json(err);
    }});

    //get route for questions and categories in quiz routes /api/quiz/category/1
//GET request at this route http://localhost:3001/api/quiz/data/category/id for getting a quiz with the same category
router.get('/data/category/:id', async (req, res) => {
    try {
        const questionData = await Question.findAll({
            where: { category_id: req.params.id }
        });
        if (!questionData || questionData.length === 0) {
            res.status(400).res.json({ message: 'Question not found' })
            return;
        } else {
            res.status(200).json(questionData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// //get route for categoryData to send to js file to dynamically render
// router.get(`/category/:id`, async (req, res) => {
//     try {

//         const categoryData = await Category.findAll(req.params.id, {
//             include: [
//                 {
//                     model: Question, 
//                     as: "questions",
//                     attributes: [
//                         "id",
//                         "question_body",
//                         "answer",
//                         "created_by_user_id",
//                     ],
//                 }
//             ],
//         });

//         console.log(categoryData);
//         let randomQuestions = new RandomEnsure(categoryData);
//         console.log(randomQuestions);
        
//         const categoriesLength = num;
//         categoriesLength = categoryData.length;
//         if (categoryData < 4) {
//             res.status(500).json("Not enough questions in this category");
//             return; 
//         }

//         const array = ["E", "C", "S", "M", "P", "Mu", "H", "G"];

//         let list = new RandomEnsure([0, 1, 2, 3, 4]);
//         console.log(list);

//         for (let i = 0; i < 1000; i++) {
//             let elem = list.next(); // Get next random ensured element.
//         }

//         for (let i = 0; i < 4; i++) {
//             let elem = list.next(); // Get next random ensured element.
//         }
//         console.log(elem);
//         console.log(list);
//         console.log(categoryData);
//         res.status(200).json(categoryData);
//     } catch (error) {
//         res.status(500).json(error);
//     }});


  
//   router.get("/example", (req, res) => {
//     res.render("example")
//   })
  
//   router.get("/", (req, res) => {
//     res.render("homepage")
//   })
  
//   router.get("/account", (req, res) => {
//     res.render("account")
//   })
  
module.exports = router;