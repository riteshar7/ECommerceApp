const jwt = require('jsonwebtoken')

exports.requireSignin = (req, res, next) => {
    if(!req.headers.authorization) return res.json({message: "Authorization needed"});
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
        if(err){
            return res.json({message: err});
        }
        req.user = decoded;
    });
    next();
}

exports.merchantVerification = (req, res, next) => {
    if(req.user.role != 'Merchant'){
        res.json({message: 'Access Denied'})
    }
    next();
}

exports.userVerification = (req, res, next) => {
    if(req.user.role != 'Customer'){
        res.json({message: 'Access Denied'})
    }
    next();
}