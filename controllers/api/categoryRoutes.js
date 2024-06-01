const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Category } = require('../../models')

router.get('/', withAuth, async (req, res) => {
    try {
        const categoryDisp = await Category.findAll()
        if (!categoryDisp) {
            res.status(404);
            res.json({ message: 'Category not found' });
        } else {
            res.render('profile', { categoryDisp }); // Pass the data to the view
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a route for adding categories on the backend
router.post('/data/new', async (req, res) => {
    try {
        //Log the raw request body
        console.log('Raw request body', req.body);
        //Parse the JSON data
        const categoryData = await Category.create({
            category_name: req.body.category_name,
        });

        res.status(200).json(categoryData);
        console.log('Category submitted:', questionData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;