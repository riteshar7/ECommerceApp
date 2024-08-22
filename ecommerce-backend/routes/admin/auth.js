const express = require('express');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignin } = require('../../common-middlewares');
const router = express.Router();


router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
router.post('/admin/signout', signout)


module.exports = router;