const withAuth = require('../../utils/auth');
const { Category } = require('../../models')
const path = require('path');
const express = require('express'); 

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const categoryDisp = await Category.findAll()
        if (!categoryDisp) {
            res.status(404);
            res.json({ message: 'Category not found' });
        } else {
            res.render('account', { categoryDisp }); // Pass the data to the view
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;