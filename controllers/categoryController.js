const Category = require('../models/categoryModel');
const slugify = require('slugify');

function createCategories(categories, parent_id = null){

    const categoryList = [];
    let category;
    if(parent_id == null){
        category = categories.filter((cat) => cat.parent_id == undefined);
    }
    else{
        category = categories.filter((cat) => cat.parent_id == parent_id);
    }

    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategories(categories, cat._id)
        });
    }

    return categoryList;
}

exports.addCategory = (req, res) => {
    const cat_obj = {
        category_name: req.body.name,
        slug: slugify(req.body.name),
    }
    if(req.body.parent_id){
        cat_obj.parent_id = req.body.parent_id;
    }
    const _category = new Category(cat_obj);
    _category.save()
    .then((result) => {
        res.json({
            category: result
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.getCategory = (req, res) => {
    Category.find({})
    .then((categories) => {
        // console.log(categories);
        const categoryList = createCategories(categories);
        // console.log(categoryList);
        res.json({"Categories" : categoryList})
    })
    .catch((err) => {
        console.log(err)
    })
}