const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email_address: req.body.email_address,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log('Login route hit');
    try {
        const dbUserData = await User.findOne({
            where: {
                email_address: req.body.email_address
            },
        });

        if (!dbUserData) {
            return res.status(400).json({ message: 'Incorrect Email. Please Try Again' });
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect Password. Please Try Again' });
        }

        try {
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user_id = dbUserData.id;
                res.json({ user: dbUserData, message: 'You Are Now Logged In' });
            });
        } catch (err) {
            console.error('Error saving session:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
});

module.exports = router;