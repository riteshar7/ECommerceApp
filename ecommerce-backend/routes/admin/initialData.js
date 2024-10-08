const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middlewares');
const { initialData } = require('../../controllers/admin/initialData');
const router = express.Router();


router.post('/initialdata', requireSignin, adminMiddleware, initialData);


module.exports = router;