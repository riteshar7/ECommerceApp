const Product = require('../models/productModel');
const slugify = require('slugify');

exports.addProducts = (req, res) => {
    // res.json({
    //     file: req.files,
    //     body: req.body
    // });

    const { name, price, quantity, description, category } = req.body;
    const productImages = [];
    // console.log(req.files);
    if(req.files.length){
        for(let file of req.files){
            const img = { img: file.filename }; 
            productImages.push(img);
        }
        console.log(productImages);
    }

    const _product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        quantity: quantity,
        description: description,
        productImages: productImages,
        category: category,
        createdBy: req.user._id,
    });

    _product.save()
    .then((product) => {
        res.json({product});
    })
    .catch((err) => {
        console.log('Product not Saved');
        console.log(err);
    })
}

exports.getProducts = (req, res) => {
    res.json({message: 'Hello'});
}