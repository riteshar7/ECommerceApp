const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin','Customer','Merchant'],
        required: true
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
},{timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }
    catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);