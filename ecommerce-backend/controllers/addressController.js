const address = require("../models/addressModel");
const UserAddress = require("../models/addressModel");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { payload } = req.body;
  if (payload.address) {
    if (payload.address._id) {
      UserAddress.findOneAndUpdate(
        { user: req.user._id, "address._id": payload.address._id },
        {
          $set: {
            "address.$": payload.address,
          },
        }
      )
      .then((address) => {
        if (address) {
          res.json({ address });
        }
      })
      .catch(err=> cosole.log(err));
    } 
    else {
      UserAddress.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            address: payload.address,
          },
        },
        { new: true, upsert: true }
      )
      .then((address) => {
        if (address) {
          res.json({ address });
        }
      })
      .catch(err=> cosole.log(err));
    }
  } 
  else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id })
  .then((userAddress) => {
    if (userAddress) {
      res.json({ userAddress });
    }
  })
  .catch(err=> cosole.log(err));
};