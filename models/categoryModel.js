const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true
    },
    category_img: {
        type: String,
    },
    parent_id: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
    }
},{timestamps: true});

module.exports = mongoose.model('Category', categorySchema);