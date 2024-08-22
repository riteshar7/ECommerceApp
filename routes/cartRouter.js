const express = require('express');
const { addItemToCart } = require('../controllers/cartController');
const { requireSignin, userMiddleware } = require('../common-middlewares');
const router = express.Router();


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

module.exports = router;