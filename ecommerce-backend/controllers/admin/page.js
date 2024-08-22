const Page = require('../../models/pageModel');

exports.createPage = (req, res) => {
    const { banners, products } = req.files;
    if(banners.length > 0){
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }
    if(products.length > 0){
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }

    req.body.createdBy = req.user._id;

    const page = new Page(req.body);

    page.save()
    .then((page) => {
        if(page){
            return res.status(201).json({ page });
        }
    })
    .catch((err)=>{
        console.log(err);
    })

    res.status(200).json({ body: req.body });
}