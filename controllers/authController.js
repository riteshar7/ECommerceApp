const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = (req,res) => {
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(user) return res.status(400).json({
            message: 'User already exists'
        });
        const {username, email, password, role} = req.body;
        const _user = new User({
            username,
            email,
            password,
            role,
        });

        console.log(role);
        console.log(_user);

        _user.save()
        .then((result) => {
            res.status(201).json({
                user: result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: 'Something went wrong'
            })
            console.log(err);
        })
    })
    .catch((error) => {
        return res.status(400).json({
            message: 'Something went wrong here'
        })
    })
}

exports.signin = (req,res) => {
    console.log(req.body);
    User.findOne({email : req.body.email})
    .then((user)=>{
        if(user){
            if(user.comparePassword(req.body.password)){
                jwt.sign({_id: user._id}, process.env.JWT_SECRETKEY, { expiresIn: '1 hour'}, (err, token)=>{
                    const {_id, username, email, password, role} = user;
                    res.cookie('token', token, {expiresIn: '1 hour'})
                    res.json({
                        token,
                        user: {_id, username, email, password, role}
                    });
                    // res.redirect('/consumer/');
                });
            }
            else{
                return res.json({
                    message: 'Wrong Password'
                });
            }
        }
        else{
            return res.json({
                message: 'Account does not exist'
            });
        }
    })
    .catch((err)=>{
        return res.json({
            message: err
        });
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: "Signed Out Successfully"
    })
}