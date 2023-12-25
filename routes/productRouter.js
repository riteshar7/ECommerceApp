const express = require('express');
const { addProducts, getProducts } = require('../controllers/productController');
const { requireSignin, merchantVerification } = require('../common-middlewares/index');
const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const shortid = require('shortid');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/create', requireSignin, upload.array('productPicture'), addProducts);
router.get('/', getProducts);

module.exports = router;