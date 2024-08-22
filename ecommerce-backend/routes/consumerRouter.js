const express = require('express');
const router = express.Router()

router.get('/',(req, res) => {
    res.render('consumer/home_customer',{data: {
        token,
        user: {_id, username, email, password, role}
    }});
})

module.exports = router;