const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");

exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.user._id })
  .then((result) => {
    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];
      const order = new Order(req.body);
      order.save()
      .then((order) => {
        if (order) {
          res.json({ order });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPictures")
    .then((orders) => {
      if (orders) {
        res.json({ orders });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .then((order) => {
      if (order) {
        Address.findOne({user: req.user._id})
        .then(async (address) => {
          order.address = await address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.json({
            order,
          });
        })
        .catch((err) => {
            console.log(err);
        });
      }
    })
    .catch((err) => {
        console.log(err);
    });
};