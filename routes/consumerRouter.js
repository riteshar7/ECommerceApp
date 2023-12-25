const express = require('express');
const router = express.Router()

router.get('/',(req, res) => {
    res.render('consumer/home_customer');
})

module.exports = router;