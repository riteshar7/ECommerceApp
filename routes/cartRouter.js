const express = require('express');
const { addItemsToCart } = require('../controllers/cartController');
const { requireSignin, userVerification } = require('../common-middlewares/index');
const router = express.Router();

router.post('/add', requireSignin, addItemsToCart);
// router.get('/', getCategory);

module.exports = router;