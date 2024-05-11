const router = require('express').Router();

const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const categoryRoutes = require('./categoryRoutes');
const quizRoutes = require('./quizRoutes');
const scoreRoutes = require('./scoreRoutes');

router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/category', categoryRoutes);
router.use('/quiz', quizRoutes);
router.use('/score', scoreRoutes);

module.exports = router;

