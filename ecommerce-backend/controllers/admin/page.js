const Page = require('../../models/pageModel');

exports.createPage = (req, res) => {
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
        img: `/public/${banner.filename}`,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }
    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
        img: `/public/${product.filename}`,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }

    req.body.createdBy = req.user._id;

    Page.findOne({ category: req.body.category })
    .then((page) =>{
        if (page) {
            Page.findOneAndUpdate({ category: req.body.category }, req.body)
            .then((updatedPage) => {
                if (updatedPage) {
                    return res.status(201).json({ page: updatedPage });
                }
            })
            .catch((err) =>{
                console.log(err);
            });
        }
        const _page = new Page(req.body);
        _page.save()
        .then((page) => {
            if (page) {
            return res.json({ page });
            }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};


exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type === "page") {
    Page.findOne({ category: category })
    .then((page) => {
        if (page) return res.json({ page });
    })
    .catch((err) => {
        console.log(err);
    })
  }
};