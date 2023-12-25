const express = require('express');
const { addCategory, getCategory } = require('../controllers/categoryController');
const { requireSignin, merchantVerification } = require('../common-middlewares/index');
const router = express.Router();

router.post('/create', requireSignin, merchantVerification, addCategory);
router.get('/', getCategory);

module.exports = router;