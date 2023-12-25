const Cart = require('../models/cartModel');
const User = require('../models/userModel');

exports.addItemsToCart = (req, res) => {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // cartItems: [
    //     {
    //         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    //         quantity: { type: Number, default: 1 },
    //         price: { type: Number, required: true }
    //     }
    // ]
    Cart.findOne({user: req.user._id})
    .then((cart) => {
        if(cart){
            //if cart of that particular user already exists

            const sameItem = cart.cartItems.find(cItems => cItems.product == req.body.cartItems.product)
            if(sameItem){
                //if the item is same of that same user, just update the quantity
                Cart.findOneAndUpdate({"user": req.user._id, "cartItems.product": req.body.cartItems.product},{
                    "$set":{
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: sameItem.quantity + req.body.cartItems.quantity
                        }
                    }
                })
                .then((_cart) => {
                    res.json(_cart)
                })
                .catch(err => console.log(err))
            }
            else{
                //if cart already exists but different item
                Cart.findOneAndUpdate({user: req.user._id},{
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .then((_cart) => {
                    res.json(_cart)
                })
                .catch(err => console.log(err))
            }    
        }
        else{
            //if No cart exists with the user
            const _item = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
        
            _item.save()
            .then((cart) => {
                res.json(cart);
            })
            .catch((err) => {
                console.log('Cart not added');
                console.log(err);
            })

        }
    })
    .catch((err) => {
        console.log(err);
    })
}