const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(async (user) => {
        if(user) return res.status(400).json({
            message: 'Admin already registered'
        });

        User.estimatedDocumentCount()
        .then(async (count) =>{
            let role = "admin";
            if (count === 0) {
                role = "super-admin";
            }

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({ 
                firstName, 
                lastName, 
                email, 
                hash_password,
                username: shortid.generate(),
                role: 'admin'
            });

            _user.save()
            .then((user) => {
                if(user){
                    console.log(user);
                    res.json({
                        message: "Admin created Successfully..!",
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            });
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
    .then(async (user) => {
        if(user){
            const isPassword = await user.authenticate(req.body.password);
            if(isPassword && (user.role === "admin" || user.role === "super-admin")){
                jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d'}, (err, token)=>{
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.cookie('token', token, { expiresIn: '1d' });
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


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully...!'
    })
};