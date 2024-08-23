const Order = require("../../models/orderModel");

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  )
  .then((order)=>{
    res.json({ order });
  })
  .catch((err)=>{
    console.log(err);
  });
};

exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    });
  res.status(200).json({ orders });
};