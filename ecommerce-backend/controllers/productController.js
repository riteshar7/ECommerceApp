const Product = require("../models/productModel");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/categoryModel");

exports.createProduct = (req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const { name, price, description, category, quantity, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save()
  .then((product) => {
    if (product) {
      res.json({ product, files: req.files });
    }
  })
  .catch(err => console.log(err));
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .then((category) => {
      if (category) {
        Product.find({ category: category._id })
        .then((products) => {
          if (category.type) {
            if (products.length > 0) {
              res.json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.json({ products });
          }
        })
        .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId })
    .then((product) => {
      if (product) {
        res.json({ product });
      }
    })
    .catch(err => console.log(err));
  } 
  else {
    return res.json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId })
    .then((result) => {
      if (result) {
        res.json({ result });
      }
    })
    .catch(err => console.log(err));
  } 
  else {
    res.json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .then((data) =>{
        console.log(data);
    })
    .catch(err => console.log(err));

  res.json({ products });
};