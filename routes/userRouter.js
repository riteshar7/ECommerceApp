const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/authController');
const { requireSignin } = require('../common-middlewares/index');

router.get('/register', ( req, res) => {
    res.render('signup');
});
router.post('/register', signup );

router.get('/signin', ( req, res) => {
    res.render('login');
})
router.post('/signin', signin );

router.post('/signout', requireSignin, signout);

router.get('/profile', requireSignin, (req, res) => {
    return res.json({
        message: req.user
    })
});

module.exports = router;