const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if(user) return res.status(400).json({
                message: 'User already registered'
            });

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            console.log(firstName);

            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);

            const _user = new User({ 
                firstName, 
                lastName, 
                email, 
                hash_password,
                username: shortid.generate()
            });

            _user.save()
            .then((user) => {
                if(user){
                    console.log(user);
                    jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1 hour'}, (err, token)=>{
                        const { _id, firstName, lastName, email, role, fullName } = user;
                        return res.json({
                            token,
                            user: {_id, firstName, lastName, email, role, fullName}
                        });
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
        if(user){
            if(user.authenticate(req.body.password)){
                jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1 hour'}, (err, token)=>{
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.json({
                        token,
                        user: {_id, firstName, lastName, email, role, fullName}
                    });
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }

        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    })
    .catch((err)=>{
        console.log(err);
    });
}