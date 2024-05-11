const router = require('express').Router();

const { Model } = require('sequelize');
const apiRoutes = require('./api');

const homeRoutes = require('./homeRoutes');
const withAuth = require('../utils/auth');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

